import React from "react";
import { useParentOrganizations } from "hooks/useParentOrganizations";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { Formik } from "formik";
import * as parentOrganizationService from "../../services/parent-organization-service";
import { tenantId } from "helpers/Configuration";
import IconButton from "components/UI/IconButton";
import { Redirect, withRouter } from "react-router-dom";

const columns = [
  { id: "edit", label: "" },
  { id: "delete", label: "" },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "code", label: "Code", minWidth: 10 },
];

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: "500px",
    cursor: "pointer",
  },
  heading: {
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  error: {
    color: theme.palette.error.main,
  },
}));

function ParentOrganizations(props) {
  let { data, status } = useParentOrganizations();
  const [parentOrgs, setParentOrgs] = React.useState([]);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [activeOrg, setActiveOrg] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [error, setError] = React.useState("");
  const [deleteError, setDeleteError] = React.useState("");

  React.useEffect(() => {
    if (data) {
      setParentOrgs(data);
    }
  }, [data]);

  React.useEffect(() => {
    if (status === 401) {
      return (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      );
    }
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSave = async (data) => {
    try {
      if (activeOrg.id) {
        await parentOrganizationService.update({ ...data, id: activeOrg.id });
      } else {
        const { id } = await parentOrganizationService.post(data);
        setParentOrgs([...parentOrgs, { ...data, id }]);
      }
      setActiveOrg(null);
    } catch (e) {
      setError(e.message);
    }
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const handleAddNew = () => {
    setActiveOrg({
      code: "",
      name: "",
      tenantId,
    });
  };

  const handleDelete = async (id) => {
    try {
      await parentOrganizationService.remove(id);
      const data = parentOrgs.filter((parentOrg) => parentOrg.id !== id);
      setParentOrgs(data);
    } catch (e) {
      setDeleteError(e.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <div className={classes.heading}>
        <h2 style={{ margin: 0 }}>Parent Organizations</h2>
        <Button onClick={handleAddNew}>Add New</Button>
      </div>

      {deleteError && (
        <div className={classes.error}>Something went wrong.</div>
      )}

      <Paper>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {parentOrgs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((parentOrg) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={parentOrg.id}
                      selected={parentOrg.id === activeOrg}
                    >
                      {columns.map((column) => {
                        const value = parentOrg[column.id];
                        if (column.id === "edit") {
                          return (
                            <TableCell
                              style={{ maxWidth: "5px", padding: "5px" }}
                              key={column.id}
                              align={column.align}
                            >
                              <IconButton
                                icon="edit"
                                onClick={() => {
                                  const org = parentOrgs.find(
                                    (org) => parentOrg.id === org.id
                                  );
                                  setActiveOrg(org);
                                }}
                              />
                            </TableCell>
                          );
                        }
                        if (column.id === "delete") {
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ maxWidth: "5px", padding: "5px" }}
                            >
                              <IconButton
                                icon="delete"
                                onClick={() => handleDelete(parentOrg.id)}
                              />
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={parentOrgs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Modal
          open={!!activeOrg}
          onClose={() => setActiveOrg(null)}
          aria-labelledby="parent-org-modal"
          aria-describedby="parent-org-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <div id="simple-modal-title">
              <h2>Edit Parent Organization</h2>
            </div>

            <Formik
              initialValues={{
                name: (activeOrg && activeOrg.name) || "",
                code: (activeOrg && activeOrg.code) || "",
              }}
              onSubmit={(values) => handleSave(values)}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                touched,
                errors,
                isSubmitting,
              }) => (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                >
                  <Input
                    label="Name"
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                    helperText={touched.name ? errors.name : ""}
                    error={touched.name && Boolean(errors.name)}
                    fullWidth
                    autoFocus
                  />
                  <Input
                    label="Code"
                    id="code"
                    value={values.code}
                    onChange={handleChange}
                    helperText={touched.code ? errors.code : ""}
                    error={touched.code && Boolean(errors.code)}
                    fullWidth
                  />
                  {error && (
                    <div className={classes.error}>Something went wrong.</div>
                  )}
                  <Box mt={3} display="flex" justifyContent="space-between">
                    <Button color="white" onClick={() => setActiveOrg(null)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      Save
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </div>
        </Modal>
      </Paper>
    </Container>
  );
}

export default withRouter(ParentOrganizations)
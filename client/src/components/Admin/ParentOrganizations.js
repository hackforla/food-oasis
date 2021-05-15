import React from "react";
import { useParentOrganization } from "hooks/useParentOrganizations";
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

const columns = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "code", label: "Code", minWidth: 10 },
  {
    id: "tenantId",
    label: "Tenant ID",
    minWidth: 10,
    align: "left",
  },
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
  root: {
    width: "50%",
  },
  container: {
    maxHeight: 340,
    cursor: "pointer",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ParentOrganizations(props) {
  // const parentOrgs = useParentOrganization();
  const parentOrgs = [
    {
      code: "TSA",
      id: 1,
      name: "first",
      tenantId: 1,
    },
    {
      code: "TSA",
      id: 2,
      name: "second",
      tenantId: 2,
    },
    {
      code: "TSA",
      id: 3,
      name: "third",
      tenantId: 3,
    },
    {
      code: "TSA",
      id: 4,
      name: "fourth",
      tenantId: 1,
    },
    {
      code: "TSA",
      id: 5,
      name: "fifth",
      tenantId: 1,
    },
    {
      code: "TSA",
      id: 6,
      name: "sixth",
      tenantId: 2,
    },
    {
      code: "TSA",
      id: 7,
      name: "seventh",
      tenantId: 3,
    },
  ];

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [activeId, setActiveId] = React.useState(null);
  const [modalStyle] = React.useState(getModalStyle);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSave = (e) => {
    console.log(e);
    setActiveId(null);
  };

  return (
    <Container maxWidth="md">
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
                      selected={parentOrg.id === activeId}
                      onClick={() => setActiveId(parentOrgs[parentOrg.id])}
                    >
                      {columns.map((column) => {
                        const value = parentOrg[column.id];
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
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <Modal
          open={activeId}
          onClose={() => setActiveId(null)}
          aria-labelledby="parent-org-modal"
          aria-describedby="parent-org-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <div id="simple-modal-title">
              <h2>Edit Parent Organization</h2>
            </div>

            <Formik
              initialValues={{
                name: (activeId && activeId.name) || "",
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
                  <Box mt={3} display="flex" justifyContent="space-between">
                    <Button color="white" onClick={() => setActiveId(null)}>
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

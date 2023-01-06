import React from "react";
import { useTags } from "hooks/useTags";
import * as tagService from "../../services/tag-service";
import makeStyles from "@mui/styles/makeStyles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "../UI/Button";
import Input from "../UI/TextField";
import { Formik } from "formik";
import { tenantId } from "helpers/Configuration";
import IconButton from "components/UI/IconButton";
import { Redirect, withRouter } from "react-router-dom";

const columns = [
  { id: "edit", label: "" },
  { id: "delete", label: "" },
  { id: "name", label: "Name", minWidth: 100 },
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

function TagAdmin(props) {
  let { data, status } = useTags();
  const [tags, setTags] = React.useState([]);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [activeTag, setActiveTag] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [error, setError] = React.useState("");
  const [deleteError, setDeleteError] = React.useState("");

  React.useEffect(() => {
    if (data) {
      setTags(data);
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
      if (activeTag.id) {
        await tagService.update({ ...data, id: activeTag.id });
      } else {
        const { id } = await tagService.post(data);
        setTags([...tags, { ...data, id }]);
      }
      setActiveTag(null);
    } catch (e) {
      setError(e.message);
    }
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const handleAddNew = () => {
    setActiveTag({
      name: "",
      tenantId,
    });
  };

  const handleDelete = async (id) => {
    try {
      await tagService.remove(id);
      const data = tags.filter((tag) => tag.id !== id);
      setTags(data);
    } catch (e) {
      setDeleteError(e.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <div className={classes.heading}>
        <h2 style={{ margin: 0 }}>Tags</h2>
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
              {tags
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((tag) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={tag.id}
                      selected={tag.id === activeTag}
                    >
                      {columns.map((column) => {
                        const value = tag[column.id];
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
                                  const aTag = tags.find(
                                    (t) => t.id === tag.id
                                  );
                                  setActiveTag(aTag);
                                }}
                                size="large"
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
                                onClick={() => handleDelete(tag.id)}
                                size="large"
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
          count={tags.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Modal
          open={!!activeTag}
          onClose={() => setActiveTag(null)}
          aria-labelledby="tag-modal"
          aria-describedby="tag-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <div id="simple-modal-title">
              <h2>Edit Tag</h2>
            </div>

            <Formik
              initialValues={{
                name: (activeTag && activeTag.name) || "",
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

                  {error && (
                    <div className={classes.error}>Something went wrong.</div>
                  )}
                  <Box mt={3} display="flex" justifyContent="space-between">
                    <Button color="white" onClick={() => setActiveTag(null)}>
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

export default withRouter(TagAdmin);

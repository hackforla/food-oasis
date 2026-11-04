import {
  Box,
  Button,
  Container,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TablePagination,
  TablePaginationOwnProps,
  TableRow,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { TENANT_ID } from "helpers/Constants";
import { useParentOrganizations } from "hooks/useParentOrganizations";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import * as parentOrganizationService from "../../services/parent-organization-service";
import { IconButton } from "../UI/StandardButton";
import Label from "./ui/Label";

interface ParentOrganization {
  id?: number;
  name: string;
  code: string;
  tenantId?: number;
  [key: string]: unknown;
}

interface ParentOrganizationFormValues {
  name: string;
  code: string;
}

interface Column {
  id: "edit" | "delete" | "name" | "code";
  label: string;
  minWidth?: number;
  align?: TableCellProps["align"];
  format?: (value: number) => string;
}

const columns: Column[] = [
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

function ParentOrganizations() {
  const { data, status } = useParentOrganizations() as {
    data: ParentOrganization[];
    status?: number;
  };
  const [parentOrgs, setParentOrgs] = useState<ParentOrganization[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeOrg, setActiveOrg] = useState<ParentOrganization | null>(null);
  const [modalStyle] = useState<React.CSSProperties>(getModalStyle);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (data) {
      setParentOrgs(data);
    }
  }, [data]);

  const handleChangePage: TablePaginationOwnProps["onPageChange"] = (
    _event,
    newPage
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage: TablePaginationOwnProps["onRowsPerPageChange"] =
    (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

  const handleSave = async (values: ParentOrganizationFormValues) => {
    try {
      if (activeOrg?.id) {
        await parentOrganizationService.update({ ...values, id: activeOrg.id });
      } else {
        const { id } = await parentOrganizationService.post(values);
        setParentOrgs((prev) => [...prev, { ...values, id }]);
      }
      setActiveOrg(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    }
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const handleAddNew = () => {
    setActiveOrg({
      code: "",
      name: "",
      tenantId: TENANT_ID,
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await parentOrganizationService.remove(id);
      const filteredData = parentOrgs.filter(
        (parentOrg) => parentOrg.id !== id
      );
      setParentOrgs(filteredData);
    } catch (e) {
      setDeleteError(e instanceof Error ? e.message : "Unknown error");
    }
  };

  if (status === 401) {
    return <Navigate to="/admin/login" state={{ from: location }} />;
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={(theme) => ({
          display: "flex",
          justifyContent: "space-between",
          marginBottom: theme.spacing(1),
        })}
      >
        <h2 style={{ margin: 0 }}>Parent Organizations</h2>
        <Button variant="outlined" onClick={handleAddNew}>
          Add New
        </Button>
      </Box>

      {deleteError && (
        <Box sx={(theme) => ({ color: theme.palette.error.main })}>
          Something went wrong.
        </Box>
      )}

      <Paper>
        <TableContainer sx={{ maxHeight: "500px", cursor: "pointer" }}>
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
                      selected={parentOrg.id === activeOrg?.id}
                    >
                      {columns.map((column) => {
                        const value =
                          parentOrg[column.id as keyof ParentOrganization];
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
                                  setActiveOrg(org || null);
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
                                color="error"
                                onClick={() => {
                                  if (parentOrg.id) {
                                    handleDelete(parentOrg.id);
                                  }
                                }}
                              />
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : (value as React.ReactNode)}
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
          <Box
            style={modalStyle}
            sx={(theme) => ({
              position: "absolute",
              width: 400,
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.shadows[5],
              padding: theme.spacing(2, 4, 3),
            })}
          >
            <div id="simple-modal-title">
              <h2>Edit Parent Organization</h2>
            </div>

            <Formik
              initialValues={{
                name: activeOrg?.name || "",
                code: activeOrg?.code || "",
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
                    handleSubmit();
                  }}
                >
                  <div>
                    <Label id="name" label="Name" />
                    <TextField
                      placeholder="Name"
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      helperText={touched.name ? errors.name : ""}
                      error={touched.name && Boolean(errors.name)}
                      fullWidth
                      autoFocus
                    />
                  </div>
                  <div>
                    <Label id="code" label="Code" />
                    <TextField
                      placeholder="Code"
                      id="code"
                      name="code"
                      value={values.code}
                      onChange={handleChange}
                      helperText={touched.code ? errors.code : ""}
                      error={touched.code && Boolean(errors.code)}
                      fullWidth
                    />
                  </div>
                  {error && (
                    <Box sx={(theme) => ({ color: theme.palette.error.main })}>
                      Something went wrong.
                    </Box>
                  )}
                  <Box mt={3} display="flex" justifyContent="space-between">
                    <Button
                      variant="outlined"
                      onClick={() => setActiveOrg(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Save
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Modal>
      </Paper>
    </Container>
  );
}

export default ParentOrganizations;

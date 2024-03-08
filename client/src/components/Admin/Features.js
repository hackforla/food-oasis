import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Container,
  Dialog,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFeatureToLogin } from "../../hooks/useFeatureToLogin";
import * as accountService from "../../services/account-service";
import * as featureService from "../../services/feature-service";
import * as featureToLoginService from "../../services/feature-to-login-service";

function createData(featureName, users, featureId) {
  return {
    name: featureName,
    id: featureId,
    history: users.map((user) => ({
      loginId: user.login_id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      featureToLoginId: user.ftl_id,
    })),
  };
}

const featureFormValidationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
});
const userFormValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("User email is required"),
});
const Features = () => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [rows, setRows] = useState([]);
  const [selectedFeatureName, setSelectedFeatureName] = useState("");
  const [selectedFeatureId, setSelectedFeatureId] = useState(null);
  const [featureModalOpen, setFeatureModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const {
    data: featureToLoginData,
    loading: featureToLoginLoading,
    refetch: featureToLoginRefetch,
  } = useFeatureToLogin();

  useEffect(() => {
    if (featureToLoginData) {
      const groupedByFeatureName = featureToLoginData.reduce((acc, curr) => {
        acc[curr.feature_name] = [...(acc[curr.feature_name] || []), curr];
        return acc;
      }, {});
      const newRows = Object.entries(groupedByFeatureName).map(
        ([featureName, users]) => {
          const featureId = users[0]?.feature_id;
          return createData(featureName, users, featureId);
        }
      );
      setRows(newRows);
    }
  }, [featureToLoginData]);

  const handleFeatureModalOpen = () => setFeatureModalOpen(true);
  const handleModalClose = () => {
    setFeatureModalOpen(false);
    featureFormik.resetForm();
  };
  const handleUserModalOpen = (featureName, featureId) => {
    setSelectedFeatureName(featureName);
    setSelectedFeatureId(featureId);
    setUserModalOpen(true);
  };
  const handleUserModalClose = () => {
    setUserModalOpen(false);
    userFormik.resetForm();
  };
  const handleRowClick = (rowName) => {
    if (selectedRowId === rowName) {
      setSelectedRowId(null);
    } else {
      setSelectedRowId(rowName);
    }
  };
  const featureFormik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: featureFormValidationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      await featureService.post(values);
      featureToLoginRefetch();
      resetForm();
      setSubmitting(false);
      handleModalClose();
    },
  });
  const userFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: userFormValidationSchema,
    onSubmit: async (values, { resetForm, setSubmitting, setFieldError }) => {
      try {
        const accountResponse = await accountService.getByEmail(values.email);
        const loginId = accountResponse.data.data.id;
        const featureId = selectedFeatureId;
        await featureToLoginService.addUserToFeature(featureId, loginId);
        resetForm();
        setSubmitting(false);
        handleUserModalClose();
        featureToLoginRefetch();
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 404:
              setFieldError("email", "No user found with this email");
              break;
            case 409:
              setFieldError(
                "email",
                "The user has already been granted access to this feature."
              );
              break;
            default:
              setFieldError("email", "An error occurred. Please try again.");
              break;
          }
        }
      }
    },
  });

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          marginBottom: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h2" style={{ margin: 0, fontWeight: "bold" }}>
          Feature to Logins
        </Typography>
        <Button variant="outlined" onClick={handleFeatureModalOpen}>
          Add New Feature
        </Button>
      </Box>
      {featureToLoginLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell> Feature ID </TableCell>
                <TableCell>Feature Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <React.Fragment key={index}>
                  <TableRow
                    onClick={() => handleRowClick(row.name)}
                    sx={{
                      "& > *": { borderBottom: "unset", cursor: "pointer" },
                    }}
                    hover
                  >
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleRowClick(row.name)}
                      >
                        {selectedRowId === row.name ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>

                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ justifyContent: "space-between" }}
                    >
                      {row.id}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ justifyContent: "space-between" }}
                    >
                      {row.name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={selectedRowId === row.name}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ margin: 1 }}>
                          <Stack direction="row" justifyContent="space-between">
                            <Typography
                              variant="h6"
                              gutterBottom
                              component="div"
                            >
                              Users
                            </Typography>

                            <IconButton
                              color="primary"
                              aria-label="add-user"
                              onClick={() =>
                                handleUserModalOpen(row.name, row.id)
                              }
                            >
                              <PersonAddIcon />
                            </IconButton>
                          </Stack>

                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>Login ID</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {row.history.map((historyRow) => (
                                <TableRow key={historyRow.loginId}>
                                  <TableCell component="th" scope="row">
                                    {historyRow.loginId}
                                  </TableCell>
                                  <TableCell>{historyRow.firstName}</TableCell>
                                  <TableCell>{historyRow.lastName}</TableCell>
                                  <TableCell>{historyRow.email}</TableCell>
                                  <TableCell>
                                    {historyRow.featureToLoginId ? (
                                      <IconButton
                                        color="error"
                                        aria-label="delete-user"
                                        onClick={async () => {
                                          try {
                                            await featureToLoginService.removeUserFromFeature(
                                              historyRow.featureToLoginId
                                            );
                                            featureToLoginRefetch();
                                          } catch (error) {
                                            console.error(
                                              "Failed to remove user from feature:",
                                              error
                                            );
                                          }
                                        }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    ) : null}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={featureModalOpen} onClose={handleModalClose}>
        <Box sx={{ width: 400, p: 2 }}>
          <Typography variant="h6" component="h2" sx={{ p: 2 }}>
            Add a new feature
          </Typography>
          <form onSubmit={featureFormik.handleSubmit}>
            <Box>
              <TextField
                placeholder="Name"
                id="name"
                onChange={featureFormik.handleChange}
                value={featureFormik.values.name}
                fullWidth
                autoFocus
              />
              {featureFormik.errors.name && (
                <Typography
                  sx={{
                    color: "error.main",
                  }}
                >
                  {featureFormik.errors.name}
                </Typography>
              )}
            </Box>
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button variant="outlined" type="submit">
                Submit
              </Button>
              <Button variant="outlined" onClick={handleModalClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Dialog>

      <Dialog
        open={userModalOpen}
        onClose={handleUserModalClose}
        aria-labelledby="add-user-modal-title"
        aria-describedby="add-user-modal-description"
      >
        <Box sx={{ width: 400, p: 2 }}>
          <Typography variant="h6" component="h2" sx={{ p: 2 }}>
            Add a user to {selectedFeatureName}
          </Typography>
          <form onSubmit={userFormik.handleSubmit}>
            <Box>
              {/* <Label id="email" label="Email" /> */}
              <TextField
                placeholder="Email"
                id="email"
                name="email"
                onChange={userFormik.handleChange}
                value={userFormik.values.email}
                fullWidth
                autoFocus
              />
              {userFormik.errors.email && (
                <Typography
                  sx={{
                    color: "error.main",
                  }}
                >
                  {userFormik.errors.email}
                </Typography>
              )}
            </Box>
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button variant="outlined" type="submit">
                Submit
              </Button>
              <Button variant="outlined" onClick={handleUserModalClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Dialog>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};
export default Features;

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
      const newRows = featureToLoginData.map((feature) =>
        createData(
          feature.feature_name,
          feature.users || [],
          feature.feature_id
        )
      );
      setRows(newRows);
    }
  }, [featureToLoginData]);

  const handleModalClose = () => {
    setFeatureModalOpen(false);
    featureFormik.resetForm();
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
    validationSchema: Yup.object({
      name: Yup.string().trim().required("Name is required"),
    }),
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
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("User email is required"),
    }),
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
        <Button
          variant="contained"
          type="button"
          icon="search"
          onClick={() => setFeatureModalOpen(true)}
        >
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
                <TableCell align="right" />
                <TableCell align="right">Feature ID</TableCell>
                <TableCell align="right">Feature Name</TableCell>
                <TableCell />
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
                      align="right"
                      component="th"
                      scope="row"
                      sx={{ justifyContent: "space-between" }}
                    >
                      {row.id}
                    </TableCell>
                    <TableCell
                      align="right"
                      component="th"
                      scope="row"
                      sx={{ justifyContent: "space-between" }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="error"
                        aria-label="delete-feature"
                        onClick={async () => {
                          await featureService.remove(row.id);
                          featureToLoginRefetch();
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
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
                              onClick={() => (featureName, featureId) => {
                                setSelectedFeatureName(featureName);
                                setSelectedFeatureId(featureId);
                                setUserModalOpen(true);
                              }}
                            >
                              <PersonAddIcon />
                            </IconButton>
                          </Stack>

                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell align="right">Login ID</TableCell>
                                <TableCell align="right">First Name</TableCell>
                                <TableCell align="right">Last Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell />
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {row.history.map((historyRow) => (
                                <TableRow key={historyRow.loginId}>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                  >
                                    {historyRow.loginId}
                                  </TableCell>
                                  <TableCell align="right">
                                    {historyRow.firstName}
                                  </TableCell>
                                  <TableCell align="right">
                                    {historyRow.lastName}
                                  </TableCell>
                                  <TableCell align="right">
                                    {historyRow.email}
                                  </TableCell>
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
          <Typography variant="h6" component="h2" sx={{ py: 2 }}>
            Add a new feature
          </Typography>
          <Typography variant="body2" display="block" gutterBottom>
            Feature names are usually camlecase
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
              <Button variant="outlined" onClick={handleModalClose}>
                Cancel
              </Button>
              <Button variant="contained" icon="search" type="submit">
                Submit
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
              <Button variant="outlined" onClick={handleUserModalClose}>
                Cancel
              </Button>
              <Button variant="contained" icon="search" type="submit">
                Submit
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
        onPageChange={(newPage) => {
          setPage(newPage);
        }}

        onRowsPerPageChange={(event) => {
          setRowsPerPage(+event.target.value);
          setPage(0);
        }}
      />
    </Container>
  );
};
export default Features;

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
  FormControlLabel,
  Switch,
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
import { useFeatures } from "../../hooks/useFeatures";
import type { Feature as ServiceFeature } from "../../services/feature-service";
import type {
  FeatureToLogin as ServiceFeatureToLogin,
  FeatureUser as ServiceFeatureUser,
} from "../../services/feature-to-login-service";
import * as accountService from "../../services/account-service";
import * as featureService from "../../services/feature-service";
import * as featureToLoginService from "../../services/feature-to-login-service";
import AddIcon from "@mui/icons-material/Add";

interface HistoryRow {
  loginId: number;
  firstName: string;
  lastName: string;
  email: string;
  featureToLoginId: number;
}

interface FeatureRow {
  featureId: number;
  name: string;
  is_enabled: boolean;
  history: HistoryRow[];
}

interface FeatureFormValues {
  name: string;
}

interface UserFormValues {
  email: string;
}

const Features: React.FC = () => {
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [rows, setRows] = useState<FeatureRow[]>([]);
  const [selectedFeatureName, setSelectedFeatureName] = useState<string>("");
  const [selectedFeatureId, setSelectedFeatureId] = useState<number | null>(
    null
  );
  const [featureModalOpen, setFeatureModalOpen] = useState<boolean>(false);
  const [userModalOpen, setUserModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const {
    data: featureToLoginData,
    loading: featureToLoginLoading,
    refetch: featureToLoginRefetch,
  } = useFeatureToLogin();

  const {
    data: featuresData,
    loading: featuresLoading,
    refetch: featureRefetch,
  } = useFeatures();

  const typedFeatures = featuresData as ServiceFeature[] | null | undefined;

  const typedFeatureToLogins = featureToLoginData as
    | ServiceFeatureToLogin[]
    | null
    | undefined;

  useEffect(() => {
    if (typedFeatures && typedFeatureToLogins) {
      const newRows: FeatureRow[] = typedFeatures.map((feature) => {
        const featureToLogin = typedFeatureToLogins.find(
          (ftl) => ftl.feature_id === feature.id
        );

        return {
          featureId: feature.id,
          name: feature.name,
          is_enabled: feature.is_enabled,
          history: featureToLogin
            ? featureToLogin.users.map((user) => ({
                loginId: user.login_id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                featureToLoginId: featureToLogin.ftl_id,
              }))
            : [],
        };
      });

      setRows(newRows);
    }
  }, [typedFeatures, typedFeatureToLogins]);

  const handleModalClose = () => {
    setFeatureModalOpen(false);
    featureFormik.resetForm();
  };
  const handleUserModalOpen = (featureName: string, featureId: number) => {
    setSelectedFeatureName(featureName);
    setSelectedFeatureId(featureId);
    setUserModalOpen(true);
  };
  const handleUserModalClose = () => {
    setUserModalOpen(false);
    userFormik.resetForm();
  };
  const handleRowClick = (rowName: string) => {
    if (selectedRowId === rowName) {
      setSelectedRowId(null);
    } else {
      setSelectedRowId(rowName);
    }
  };
  const handleIsEnabled = async (featureId: number, isEnabled: boolean) => {
    try {
      await featureService.update(featureId, { is_enabled: isEnabled });
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.featureId === featureId ? { ...row, is_enabled: isEnabled } : row
        )
      );
    } catch (error: any) {
      console.error("Error updating feature:", error);
    }
  };
  const featureFormik = useFormik<FeatureFormValues>({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required("Name is required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      await featureService.post(values);
      await featureRefetch();
      resetForm();
      setSubmitting(false);
      handleModalClose();
    },
  });
  const userFormik = useFormik<UserFormValues>({
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
        const loginId: number = accountResponse.data.data.id;

        const featureId = selectedFeatureId;
        if (!featureId) return;

        await featureToLoginService.addUserToFeature(featureId, loginId);

        resetForm();
        setSubmitting(false);
        handleUserModalClose();
        featureToLoginRefetch();
      } catch (error: any) {
        if (error?.response) {
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
        } else {
          setFieldError("email", "Network error. Please try again.");
        }
      }
    },
  });

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (featuresLoading || featureToLoginLoading || !featuresData) {
    return (
      <Stack
        style={{
          flexGrow: 1,
          width: "100%",
          margin: "100px auto",
          display: "flex",
          justifyContent: "space-around",
        }}
        aria-label="Loading spinner"
      >
        <CircularProgress />
      </Stack>
    );
  }
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
          startIcon={<AddIcon />}
          onClick={() => setFeatureModalOpen(true)}
        >
          Add New Feature
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left"> Feature ID </TableCell>
              <TableCell align="left">Feature Name</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <React.Fragment key={row.featureId}>
                <TableRow
                  onClick={() => handleRowClick(row.name)}
                  sx={{
                    "& > *": {
                      borderBottom: "unset",
                      cursor: "pointer",
                      backgroundColor: "#efefef",
                    },
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
                    align="left"
                    component="th"
                    scope="row"
                    sx={{ justifyContent: "space-between" }}
                  >
                    {row.featureId}
                  </TableCell>
                  <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    sx={{ justifyContent: "space-between" }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Switch
                          color="success"
                          checked={row.is_enabled}
                          onChange={(e) =>
                            handleIsEnabled(row.featureId, e.target.checked)
                          }
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ fontSize: "14px" }}>
                          Globally Enable
                        </Typography>
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      aria-label="delete-user"
                      onClick={async () => {
                        try {
                          await featureService.remove(row.featureId);
                          featureRefetch();
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
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="right"
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
                          <Typography variant="h6" gutterBottom component="div">
                            Users
                          </Typography>

                          <IconButton
                            color="primary"
                            aria-label="add-user"
                            onClick={() =>
                              handleUserModalOpen(row.name, row.featureId)
                            }
                          >
                            <PersonAddIcon />
                          </IconButton>
                        </Stack>

                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">Login ID</TableCell>
                              <TableCell align="left">First Name</TableCell>
                              <TableCell align="left">Last Name</TableCell>
                              <TableCell align="left">Email</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {row.history.map((historyRow) => (
                              <TableRow key={historyRow.loginId}>
                                <TableCell
                                  align="left"
                                  component="th"
                                  scope="row"
                                >
                                  {historyRow.loginId}
                                </TableCell>
                                <TableCell align="left">
                                  {historyRow.firstName}
                                </TableCell>
                                <TableCell align="left">
                                  {historyRow.lastName}
                                </TableCell>
                                <TableCell align="left">
                                  {historyRow.email}
                                </TableCell>
                                <TableCell align="right">
                                  {row.history.length > 0 && (
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
                                  )}
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

      <Dialog open={featureModalOpen} onClose={handleModalClose}>
        <Box sx={{ width: 400, p: 2 }}>
          <Typography variant="h6" component="h2" sx={{ py: 2 }}>
            Add a new feature
          </Typography>
          <Typography variant="caption">
            Feature names are usually camel-cased
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
              <Button variant="contained" type="submit" startIcon={<AddIcon />}>
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
          <Typography variant="h6" component="h2" sx={{ py: 2 }}>
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
              <Button variant="contained" type="submit" startIcon={<AddIcon />}>
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
        onPageChange={(_, newPage: number) => {
          setPage(newPage);
        }}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};
export default Features;

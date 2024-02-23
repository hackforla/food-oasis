import {
  Box,
  Container,
  FormControl,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Button,
  Modal,
  IconButton,
  Collapse,
} from "@mui/material";
import Label from "./ui/Label";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as React from "react";
import { useFeatures } from "../../hooks/useFeatures";
import { Navigate, useLocation } from "react-router-dom";
import * as featureService from "../../services/feature-service";
// function createData(featureName) {
//   return {
//     featureName,
//     userProfile: [
//       {
//         customerId: "108",
//         name: "John",
//         email: "admin@example.com",
//       },
//       {
//         customerId: "106",
//         name: "Steve",
//         email: "dataentry@example.com",
//       },
//     ],
//   };
// }
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
function Row({ row }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
      </TableRow>
      {/*  <TableRow>
       <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                User Profile
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Date</TableCell> 
                    <TableCell>User ID</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.userProfile.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      {/* <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell> 
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.name}</TableCell>
                      <TableCell align="right">{historyRow.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
}
// const rows = [createData("Sample Feature Name")];

const Features = () => {
  let { data, error, loading, status } = useFeatures();

  const [features, setFeatures] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const location = useLocation();
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);

  //get features from backend
  useEffect(() => {
    if (data) {
      setFeatures(data);
    }
  }, [data]);

  useEffect(() => {
    if (status === 401) {
      return (
        <Navigate to={{ pathname: "/login", state: { from: location } }} />
      );
    }
  });

  const handleAddNew = async (data) => {
    console.log(data);
    await featureService.post(data);
    setFeatures([...features, { ...data }]);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(features);
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          marginBottom: 5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h2" style={{ margin: 0, fontWeight: "bold" }}>
          Feature to Logins
        </Typography>

        <Button variant="outlined" onClick={handleOpen}>
          Add New
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Feature Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {features.map((feature) => (
              <Row key={feature.id} row={feature} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={modalStyle}
          sx={{
            position: "absolute",
            width: 400,
            backgroundColor: "background.paper",
            boxShadow: 5,
            padding: (2, 4, 3),
          }}
        >
          <Typography
            variant="h2"
            id="simple-modal-title"
            sx={{
              fontWeight: "bold",
            }}
          >
            Add a new feature
          </Typography>

          <Formik
            initialValues={{
              name: "",
            }}
            onSubmit={(values) => handleAddNew(values)}
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
                <Box>
                  <Label id="name" label="Name" />
                  <TextField
                    placeholder="Name"
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                    helperText={touched.name ? errors.name : ""}
                    error={touched.name && Boolean(errors.name)}
                    fullWidth
                    autoFocus
                  />
                </Box>

                {error && (
                  <Typography
                    sx={{
                      color: "error.main",
                    }}
                  >
                    Something went wrong.
                  </Typography>
                )}
                <Box mt={3} display="flex" justifyContent="space-between">
                  <Button variant="outlined" onClick={handleClose}>
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
    </Container>
  );
};
export default Features;

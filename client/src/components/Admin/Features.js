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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as React from "react";
import { useFeatures } from "../../hooks/useFeatures";

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

function Row({row}) {
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
  const [features, setFeatures] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  let { data, error, loading } = useFeatures();
  //get features from backend
  useEffect(() => {
    if (data) {
      setFeatures(data);
    }
  }, [data]);

  // const handleAddNew = () => {
  //   setFeatures();
  // };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(features);

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
          variant="outlined"
          onClick={() => {
            console.log("add btn clicked");
          }}
        >
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
    </Container>
  );
};
export default Features;

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
} from "@mui/material";
import { useEffect, useState } from "react";
import { Formik } from "formik";

const Features = () => {
  const [features, setFeatures] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleAddNew = () => {
    setFeatures();
  };
  return <Container maxWidth="sm"></Container>;
};
export default Features;

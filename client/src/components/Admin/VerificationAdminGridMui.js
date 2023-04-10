import { Link as RouterLink } from "react-router-dom";
import { VERIFICATION_STATUS_NAMES } from "../../constants/stakeholder";
import clsx from "clsx";
import { DataGrid } from "@mui/x-data-grid";
import { Block } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Link } from "@mui/material";

const linkFormatter = ({ value, row }) => {
  return (
    <Link to={`/organizationedit/${row.id}`} component={RouterLink}>
      {value}
    </Link>
  );
};

const inactiveFormatter =
  (key) =>
  ({ row }) => {
    return row[key] ? (
      <Box
        sx={(theme) => ({
          textAlign: "center",
          color: theme.palette.error.main,
        })}
      >
        <Block color="confirm.main" />
      </Box>
    ) : (
      ""
    );
  };

const confirmationFormatter =
  (key) =>
  ({ row }) => {
    return row[key] ? (
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.confirmed.main,
          width: "100%",
          textAlign: "center",
        })}
      >
        <CheckIcon sx={{ color: "white" }} />
      </Box>
    ) : (
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.error.main,
          width: "100%",
          textAlign: "center",
        })}
      >
        <RemoveIcon sx={{ color: "white" }} />
      </Box>
    );
  };

const verificationStatusFormatter = ({ row }) => {
  return VERIFICATION_STATUS_NAMES[Number(row.verificationStatusId)];
};

const distanceFormatter = ({ row }) => {
  return row.distance ? row.distance.toFixed(2) : row.distance;
};

const categoriesFormatter = ({ row }) => {
  return row.categories.length > 0
    ? row.categories.map((c) => c.name).join(", ")
    : "";
};

const dateFormatter =
  (key) =>
  ({ row }) => {
    return !row[key] ? "" : row[key];
  };

const dateComparator = (v1, v2) =>
  new Date(v2).getTime() - new Date(v1).getTime();

const adminColumns = [
  {
    field: "id",
    headerName: "ID",
    renderCell: linkFormatter,
    width: 60,
    frozen: true,
  },
  {
    field: "name",
    headerName: "Name",
    renderCell: linkFormatter,
    minWidth: 400,
    frozen: true,
  },
  {
    field: "categories",
    headerName: "Categories",
    valueGetter: categoriesFormatter,
    width: 200,
    frozen: true,
  },
  {
    field: "completeCriticalPercent",
    headerName: "Critical %",
    width: 100,
  },
  {
    field: "inactive",
    headerName: "Perm Closed",
    renderCell: inactiveFormatter("inactive"),
    width: 120,
  },
  {
    field: "inactiveTemporary",
    headerName: "Covid Closed",
    renderCell: inactiveFormatter("inactiveTemporary"),
    width: 150,
  },
  {
    field: "verificationStatusId",
    headerName: "Status",
    valueGetter: verificationStatusFormatter,
    width: 180,
  },
  {
    field: "confirmedName",
    headerName: "Name",
    renderCell: confirmationFormatter("confirmedName"),
    width: 100,
  },
  {
    field: "confirmedCategories",
    headerName: "Categories",
    renderCell: confirmationFormatter("confirmedCategories"),
    width: 100,
  },
  {
    field: "confirmedAddress",
    headerName: "Address",
    renderCell: confirmationFormatter("confirmedAddress"),
    width: 100,
  },
  {
    field: "confirmedPhone",
    headerName: "Phone",
    renderCell: confirmationFormatter("confirmedPhone"),
    width: 100,
  },
  {
    field: "confirmedEmail",
    headerName: "Email",
    renderCell: confirmationFormatter("confirmedEmail"),
    width: 100,
  },
  {
    field: "confirmedHours",
    headerName: "Hours",
    renderCell: confirmationFormatter("confirmedHours"),
    width: 100,
  },
  {
    field: "confirmedFoodTypes",
    headerName: "FoodTypes",
    renderCell: confirmationFormatter("confirmedFoodTypes"),
    width: 100,
  },
  {
    field: "neighborhoodName",
    headerName: "Neighborhood",
    width: 150,
  },
  { field: "assignedUser", headerName: "Assigned To", width: 200 },
  {
    field: "assignedDate",
    headerName: "Assigned",
    valueGetter: dateFormatter("assignedDate"),
    dataType: "date-time",
    sortComparator: dateComparator,
    width: 200,
  },
  { field: "submittedUser", headerName: "Submitted By", width: 200 },
  {
    field: "submittedDate",
    headerName: "Submitted",
    valueGetter: dateFormatter("submittedDate"),
    dataType: "date-time",
    sortComparator: dateComparator,
    width: 200,
  },
  { field: "reviewedUser", headerName: "Approved By", width: 200 },
  {
    field: "approvedDate",
    headerName: "Approved",
    valueGetter: dateFormatter("approvedDate"),
    dataType: "date-time",
    sortComparator: dateComparator,
    width: 250,
  },
  { field: "createdUser", headerName: "Entered By", width: 200 },
  {
    field: "createdDate",
    headerName: "Entered",
    valueGetter: dateFormatter("createdDate"),
    dataType: "date-time",
    sortComparator: dateComparator,
    width: 250,
  },
  { field: "modifiedUser", headerName: "Modified By", width: 200 },
  {
    field: "modifiedDate",
    headerName: "Modified",
    valueGetter: dateFormatter("modifiedDate"),
    dataType: "date-time",
    sortComparator: dateComparator,
    width: 250,
  },
  { field: "address1", headerName: "Street", width: 250 },
  { field: "city", headerName: "City", width: 200 },
  { field: "zip", headerName: "Zip Code", width: 150 },
  { field: "phone", headerName: "Phone", width: 150 },
  { field: "website", headerName: "Website", width: 400 },
  {
    field: "distance",
    headerName: "Distance (mi)",
    valueGetter: distanceFormatter,
    width: 150,
  },
  {
    field: "suggestionCount",
    type: "number",
    headerName: "Suggestions",
    align: "center",
    width: 120,
    cellClassName: (params) => {
      if (params.value == null) {
        return "";
      }
      return clsx("suggestionCount-highlight", {
        count: params.value > 0,
      });
    },
  },
];
const dataEntryColumns = [
  {
    field: "id",
    headerName: "ID",
    renderCell: linkFormatter,
    width: 60,
    frozen: true,
  },
  {
    field: "name",
    headerName: "Name",
    renderCell: linkFormatter,
    minWidth: 450,
    frozen: true,
  },
  {
    field: "categories",
    headerName: "Categories",
    valueGetter: categoriesFormatter,
    width: 200,
  },
  {
    field: "completeCriticalPercent",
    headerName: "Critical %",
    width: 100,
  },
  {
    field: "inactive",
    headerName: "Perm Closed",
    renderCell: inactiveFormatter,
    width: 120,
  },
  {
    field: "inactiveTemporary",
    headerName: "Covid Closed",
    renderCell: inactiveFormatter,
    width: 150,
  },
  {
    field: "verificationStatusId",
    headerName: "Status",
    valueGetter: verificationStatusFormatter,
    width: 180,
  },
  {
    field: "confirmedName",
    headerName: "Name",
    renderCell: confirmationFormatter,
    width: 100,
  },
  {
    field: "confirmedCategories",
    headerName: "Categories",
    renderCell: confirmationFormatter,
    width: 100,
  },
  {
    field: "confirmedAddress",
    headerName: "Address",
    renderCell: confirmationFormatter,
    width: 100,
  },
  {
    field: "confirmedPhone",
    headerName: "Phone",
    renderCell: confirmationFormatter,
    width: 100,
  },
  {
    field: "confirmedEmail",
    headerName: "Email",
    renderCell: confirmationFormatter,
    width: 100,
  },
  {
    field: "confirmedHours",
    headerName: "Hours",
    renderCell: confirmationFormatter,
    width: 100,
  },
  {
    field: "confirmedFoodTypes",
    headerName: "FoodTypes",
    renderCell: confirmationFormatter,
    width: 100,
  },
  {
    field: "neighborhoodName",
    headerName: "Neighborhood",
    width: 150,
  },
  {
    field: "assignedDate",
    headerName: "Assigned",
    valueGetter: dateFormatter("assignedDate"),
    dataType: "date-time",
    sortComparator: dateComparator,
    width: 200,
  },
  {
    field: "submittedDate",
    headerName: "Submitted",
    valueGetter: dateFormatter("submittedDate"),
    dataType: "date-time",
    sortComparator: dateComparator,
    width: 200,
  },
  { field: "address1", headerName: "Street", width: 250 },
  { field: "city", headerName: "City", width: 200 },
  { field: "zip", headerName: "Zip Code", width: 150 },
  { field: "phone", headerName: "Phone", width: 150 },
];

export default function VerificationAdminGridMui(props) {
  const { stakeholders, mode } = props;
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        "& .suggestionCount-highlight.count": {
          backgroundColor: "rgb(255, 185, 185)",
        },
        "& .MuiDataGrid-main": { fontSize: 18 },
      }}
    >
      <DataGrid
        rows={stakeholders}
        columns={mode === "admin" ? adminColumns : dataEntryColumns}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}

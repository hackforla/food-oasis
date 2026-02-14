import { Block } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
  GridSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { VERIFICATION_STATUS_NAMES } from "../../constants/stakeholder";

const verificationStatusNames: Record<number, string> =
  VERIFICATION_STATUS_NAMES;

const linkFormatter = ({ value, row }: GridRenderCellParams) => {
  return <Link to={`/admin/organizationedit/${row.id}`}>{value}</Link>;
};

const inactiveFormatter =
  (key: string) =>
  ({ row }: GridRenderCellParams) => {
    return row[key] ? (
      <Box
        sx={(theme) => ({
          textAlign: "center",
          color: theme.palette.error.main,
        })}
      >
        <Block color="inherit" />
      </Box>
    ) : (
      ""
    );
  };

const confirmationFormatter =
  (key: string) =>
  ({ row }: GridRenderCellParams) => {
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

const verificationStatusFormatter = ({ row }: GridValueGetterParams) => {
  return verificationStatusNames[Number(row.verificationStatusId)];
};

const distanceFormatter = ({ row }: GridValueGetterParams) => {
  return row.distance ? row.distance.toFixed(2) : row.distance;
};

const categoriesFormatter = ({ row }: GridValueGetterParams) => {
  return row.categories.length > 0
    ? row.categories.map((c: { name: string }) => c.name).join(", ")
    : "";
};

const dateFormatter =
  (key: string) =>
  ({ row }: GridValueGetterParams) => {
    return !row[key] ? "" : row[key];
  };

const dateComparator = (v1: string, v2: string) =>
  new Date(v2).getTime() - new Date(v1).getTime();

const adminColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    renderCell: linkFormatter,
    width: 60,
  },
  {
    field: "name",
    headerName: "Name",
    renderCell: linkFormatter,
    minWidth: 400,
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
    renderCell: inactiveFormatter("inactive"),
    width: 120,
  },
  {
    field: "inactiveTemporary",
    headerName: "Temp Closed",
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
    sortComparator: dateComparator,
    width: 200,
  },
  { field: "submittedUser", headerName: "Submitted By", width: 200 },
  {
    field: "submittedDate",
    headerName: "Submitted",
    valueGetter: dateFormatter("submittedDate"),
    sortComparator: dateComparator,
    width: 200,
  },
  { field: "reviewedUser", headerName: "Approved By", width: 200 },
  {
    field: "approvedDate",
    headerName: "Approved",
    valueGetter: dateFormatter("approvedDate"),
    sortComparator: dateComparator,
    width: 250,
  },
  { field: "createdUser", headerName: "Entered By", width: 200 },
  {
    field: "createdDate",
    headerName: "Entered",
    valueGetter: dateFormatter("createdDate"),
    sortComparator: dateComparator,
    width: 250,
  },
  { field: "modifiedUser", headerName: "Modified By", width: 200 },
  {
    field: "modifiedDate",
    headerName: "Modified",
    valueGetter: dateFormatter("modifiedDate"),
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
    cellClassName: (params: GridCellParams) => {
      if (params.value == null) {
        return "";
      }
      return clsx("suggestionCount-highlight", {
        count: params.value > 0,
      });
    },
  },
];
const dataEntryColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    renderCell: linkFormatter,
    width: 60,
  },
  {
    field: "name",
    headerName: "Name",
    renderCell: linkFormatter,
    minWidth: 450,
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
    renderCell: inactiveFormatter("inactive"),
    width: 120,
  },
  {
    field: "inactiveTemporary",
    headerName: "Temp Closed",
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
  {
    field: "assignedDate",
    headerName: "Assigned",
    valueGetter: dateFormatter("assignedDate"),
    sortComparator: dateComparator,
    width: 200,
  },
  {
    field: "submittedDate",
    headerName: "Submitted",
    valueGetter: dateFormatter("submittedDate"),
    sortComparator: dateComparator,
    width: 200,
  },
  { field: "address1", headerName: "Street", width: 250 },
  { field: "city", headerName: "City", width: 200 },
  { field: "zip", headerName: "Zip Code", width: 150 },
  { field: "phone", headerName: "Phone", width: 150 },
];

interface VerificationAdminGridMuiProps {
  stakeholders: any[];
  mode: string;
  setSelectedStakeholderIds?: (ids: GridSelectionModel) => void;
}

export default function VerificationAdminGridMui({
  stakeholders,
  mode,
  setSelectedStakeholderIds,
}: VerificationAdminGridMuiProps) {
  return (
    <Box
      sx={{
        height: "80vh",
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
        checkboxSelection={mode === "admin" ? true : false}
        disableSelectionOnClick
        keepNonExistentRowsSelected
        experimentalFeatures={{ newEditingApi: true }}
        onSelectionModelChange={(ids) => {
          setSelectedStakeholderIds?.(ids);
        }}
      />
    </Box>
  );
}

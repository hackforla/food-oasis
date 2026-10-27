import { Block } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { VERIFICATION_STATUS_NAMES } from "../../constants/stakeholder";

interface StakeholderCategory {
  name: string;
}

interface StakeholderRow {
  id: number;
  name: string;
  categories: StakeholderCategory[];
  completeCriticalPercent?: number;
  inactive?: boolean;
  inactiveTemporary?: boolean;
  verificationStatusId: number;
  confirmedName?: boolean;
  confirmedCategories?: boolean;
  confirmedAddress?: boolean;
  confirmedPhone?: boolean;
  confirmedEmail?: boolean;
  confirmedHours?: boolean;
  confirmedFoodTypes?: boolean;
  neighborhoodName?: string;
  assignedUser?: string;
  assignedDate?: string | null;
  submittedUser?: string;
  submittedDate?: string | null;
  reviewedUser?: string;
  approvedDate?: string | null;
  createdUser?: string;
  createdDate?: string | null;
  modifiedUser?: string;
  modifiedDate?: string | null;
  address1?: string;
  city?: string;
  zip?: string;
  phone?: string;
  website?: string;
  distance?: number | null;
  suggestionCount?: number;
}

type StakeholderBooleanField =
  | "inactive"
  | "inactiveTemporary"
  | "confirmedName"
  | "confirmedCategories"
  | "confirmedAddress"
  | "confirmedPhone"
  | "confirmedEmail"
  | "confirmedHours"
  | "confirmedFoodTypes";

type StakeholderDateField =
  | "assignedDate"
  | "submittedDate"
  | "approvedDate"
  | "createdDate"
  | "modifiedDate";

const verificationStatusNames: Record<number, string> =
  VERIFICATION_STATUS_NAMES;

const linkFormatter = ({
  value,
  row,
}: GridRenderCellParams<StakeholderRow>) => {
  return <Link to={`/admin/organizationedit/${row.id}`}>{value}</Link>;
};

const inactiveFormatter = (key: StakeholderBooleanField) => {
  const InactiveCell = ({ row }: GridRenderCellParams<StakeholderRow>) => {
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
  return InactiveCell;
};

const confirmationFormatter = (key: StakeholderBooleanField) => {
  const ConfirmationCell = ({ row }: GridRenderCellParams<StakeholderRow>) => {
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
  return ConfirmationCell;
};

const verificationStatusFormatter = (_value: unknown, row: StakeholderRow) => {
  return verificationStatusNames[Number(row.verificationStatusId)];
};

const distanceFormatter = (_value: unknown, row: StakeholderRow) => {
  return row.distance ? row.distance.toFixed(2) : row.distance;
};

const categoriesFormatter = (_value: unknown, row: StakeholderRow) => {
  return row.categories.length > 0
    ? row.categories.map((c) => c.name).join(", ")
    : "";
};

const dateFormatter =
  (key: StakeholderDateField) => (_value: unknown, row: StakeholderRow) => {
    return !row[key] ? "" : row[key];
  };

const dateComparator = (v1: string, v2: string) => {
  const timeA = v1 ? new Date(v1).getTime() : Number.NaN;
  const timeB = v2 ? new Date(v2).getTime() : Number.NaN;
  const aInvalid = Number.isNaN(timeA);
  const bInvalid = Number.isNaN(timeB);

  if (aInvalid && bInvalid) {
    return 0;
  }
  if (aInvalid) {
    return 1;
  }
  if (bInvalid) {
    return -1;
  }

  return timeB - timeA;
};

const adminColumns: GridColDef<StakeholderRow>[] = [
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
    cellClassName: (params: GridCellParams<StakeholderRow>) => {
      if (params.value == null) {
        return "";
      }
      return clsx("suggestionCount-highlight", {
        count: Number(params.value) > 0,
      });
    },
  },
];
const dataEntryColumns: GridColDef<StakeholderRow>[] = [
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
  stakeholders: StakeholderRow[];
  mode: string;
  setSelectedStakeholderIds?: (ids: GridRowSelectionModel) => void;
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
        disableRowSelectionOnClick
        keepNonExistentRowsSelected
        onRowSelectionModelChange={(ids) => {
          setSelectedStakeholderIds?.(ids);
        }}
      />
    </Box>
  );
}

import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";
import PropTypes from "prop-types";
import { getComparableFields } from "./ChangeHistory";
import { VERIFICATION_STATUS_NAMES } from "constants/stakeholder";

// Human-readable field labels
const FIELD_LABELS = {
  name: "Name",
  address1: "Street Address",
  address2: "Address Line 2",
  city: "City",
  state: "State",
  zip: "Zip Code",
  phone: "Phone",
  phoneExt: "Phone Extension",
  email: "Email",
  website: "Website",
  latitude: "Latitude",
  longitude: "Longitude",
  description: "Description",
  notes: "Notes",
  requirements: "Requirements",
  adminNotes: "Admin Notes",
  inactive: "Inactive",
  inactiveTemporary: "Temporarily Inactive",
  parentOrganization: "Parent Organization",
  physicalAccess: "Physical Access",
  items: "Items",
  services: "Services",
  facebook: "Facebook",
  twitter: "Twitter/X",
  pinterest: "Pinterest",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  adminContactName: "Admin Contact Name",
  adminContactPhone: "Admin Contact Phone",
  adminContactEmail: "Admin Contact Email",
  donationContactName: "Donation Contact Name",
  donationContactPhone: "Donation Contact Phone",
  donationContactEmail: "Donation Contact Email",
  donationPickup: "Donation Pickup",
  donationAcceptFrozen: "Accept Frozen",
  donationAcceptRefrigerated: "Accept Refrigerated",
  donationAcceptPerishable: "Accept Perishable",
  donationSchedule: "Donation Schedule",
  donationDeliveryInstructions: "Delivery Instructions",
  donationNotes: "Donation Notes",
  covidNotes: "COVID Notes",
  categoryNotes: "Category Notes",
  eligibilityNotes: "Eligibility Notes",
  foodTypes: "Food Types",
  languages: "Languages",
  hours: "Business Hours",
  hoursNotes: "Hours Notes",
  verificationStatusId: "Verification Status",
  confirmedName: "Name Confirmed",
  confirmedCategories: "Categories Confirmed",
  confirmedAddress: "Address Confirmed",
  confirmedEmail: "Email Confirmed",
  confirmedPhone: "Phone Confirmed",
  confirmedHours: "Hours Confirmed",
  confirmedFoodTypes: "Food Types Confirmed",
  foodBakery: "Food: Bakery",
  foodDryGoods: "Food: Dry Goods",
  foodProduce: "Food: Produce",
  foodDairy: "Food: Dairy",
  foodPrepared: "Food: Prepared",
  foodMeat: "Food: Meat",
  allowWalkins: "Allow Walk-ins",
  selectedCategoryIds: "Categories",
  tags: "Tags",
};

// Format value for display
function formatValue(value, field) {
  if (value === null || value === undefined || value === "") {
    return (
      <Typography color="text.secondary" fontStyle="italic">
        (empty)
      </Typography>
    );
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (field === "verificationStatusId") {
    return VERIFICATION_STATUS_NAMES[value] || value;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return (
        <Typography color="text.secondary" fontStyle="italic">
          (empty)
        </Typography>
      );
    }
    // For hours array, format nicely
    if (field === "hours") {
      return (
        <Box
          component="pre"
          sx={{ m: 0, fontSize: "0.75rem", whiteSpace: "pre-wrap" }}
        >
          {JSON.stringify(value, null, 2)}
        </Box>
      );
    }
    // For category IDs or tags
    return value.join(", ");
  }

  if (typeof value === "object") {
    return (
      <Box
        component="pre"
        sx={{ m: 0, fontSize: "0.75rem", whiteSpace: "pre-wrap" }}
      >
        {JSON.stringify(value, null, 2)}
      </Box>
    );
  }

  return String(value);
}

// Check if values are different
function isDifferent(valueA, valueB) {
  return JSON.stringify(valueA) !== JSON.stringify(valueB);
}

export default function VersionComparison({
  versionA, // newer version
  versionB, // older version
  showOnlyChanges = true,
}) {
  const fields = getComparableFields();

  const rows = fields
    .map((field) => ({
      field,
      label: FIELD_LABELS[field] || field,
      valueA: versionA[field],
      valueB: versionB[field],
      changed: isDifferent(versionA[field], versionB[field]),
    }))
    .filter((row) => !showOnlyChanges || row.changed);

  const changeCount = rows.filter((r) => r.changed).length;

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle1">
            Comparing v{versionA.version} (Current) vs v{versionB.version}{" "}
            (Previous)
          </Typography>
          <Chip
            label={`${changeCount} field${
              changeCount !== 1 ? "s" : ""
            } changed`}
            color={changeCount > 0 ? "warning" : "success"}
            size="small"
          />
        </Stack>

        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
                  Field
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    width: "40%",
                    backgroundColor: "rgba(250, 235, 235)", // light red
                  }}
                >
                  v{versionB.version} (Previous)
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    width: "40%",
                    backgroundColor: "rgba(240, 250, 240)", // light green
                  }}
                >
                  v{versionA.version} (Current)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.field}>
                  <TableCell
                    sx={{ fontWeight: row.changed ? "bold" : "normal" }}
                  >
                    {row.label}
                    {row.changed && (
                      <Chip
                        label="changed"
                        size="small"
                        color="warning"
                        sx={{ ml: 1, height: 20, fontSize: "0.65rem" }}
                      />
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: row.changed
                        ? "rgba(220, 38, 38, 0.08)"
                        : "inherit",
                      borderLeft: row.changed ? "3px solid #dc2626" : "none",
                      verticalAlign: "top",
                    }}
                  >
                    {formatValue(row.valueB, row.field)}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: row.changed
                        ? "rgba(34, 197, 94, 0.08)"
                        : "inherit",
                      borderLeft: row.changed ? "3px solid #22c55e" : "none",
                      verticalAlign: "top",
                    }}
                  >
                    {formatValue(row.valueA, row.field)}
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography color="text.secondary">
                      No differences found between these versions.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Paper>
  );
}

VersionComparison.propTypes = {
  versionA: PropTypes.object.isRequired,
  versionB: PropTypes.object.isRequired,
  showOnlyChanges: PropTypes.bool,
};

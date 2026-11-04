import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { TabPanel } from "../ui/TabPanel";
import { VERIFICATION_STATUS_NAMES } from "constants/stakeholder";
import VersionComparison from "./VersionComparison";
import { StakeholderVersion } from "types/Organization";
const verificationStatusNames = VERIFICATION_STATUS_NAMES as Record<
  number,
  string
>;

interface ChangeHistoryProps {
  tabPage: number;
  versions?: StakeholderVersion[];
  loading?: boolean;
  error?: Error | null;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getComparableFields() {
  return [
    "name",
    "address1",
    "address2",
    "city",
    "state",
    "zip",
    "phone",
    "phoneExt",
    "email",
    "website",
    "latitude",
    "longitude",
    "description",
    "notes",
    "requirements",
    "adminNotes",
    "inactive",
    "inactiveTemporary",
    "parentOrganization",
    "physicalAccess",
    "items",
    "services",
    "facebook",
    "twitter",
    "pinterest",
    "linkedin",
    "instagram",
    "adminContactName",
    "adminContactPhone",
    "adminContactEmail",
    "donationContactName",
    "donationContactPhone",
    "donationContactEmail",
    "donationPickup",
    "donationAcceptFrozen",
    "donationAcceptRefrigerated",
    "donationAcceptPerishable",
    "donationSchedule",
    "donationDeliveryInstructions",
    "donationNotes",
    "covidNotes",
    "categoryNotes",
    "eligibilityNotes",
    "foodTypes",
    "languages",
    "hours",
    "hoursNotes",
    "verificationStatusId",
    "confirmedName",
    "confirmedCategories",
    "confirmedAddress",
    "confirmedEmail",
    "confirmedPhone",
    "confirmedHours",
    "confirmedFoodTypes",
    "foodBakery",
    "foodDryGoods",
    "foodProduce",
    "foodDairy",
    "foodPrepared",
    "foodMeat",
    "allowWalkins",
    "selectedCategoryIds",
    "tags",
  ];
}

export default function ChangeHistory({
  tabPage,
  versions = [],
  loading = false,
  error = null,
}: ChangeHistoryProps) {
  const [selectedVersionA, setSelectedVersionA] =
    useState<StakeholderVersion | null>(null);
  const [selectedVersionB, setSelectedVersionB] =
    useState<StakeholderVersion | null>(null);
  const [showOnlyChanges, setShowOnlyChanges] = useState(true);

  const countChanges = (
    versionA: StakeholderVersion | null,
    versionB: StakeholderVersion | null
  ) => {
    if (!versionA || !versionB) return 0;
    const fieldsToCompare = getComparableFields();
    return fieldsToCompare.filter(
      (field) =>
        JSON.stringify(versionA[field]) !== JSON.stringify(versionB[field])
    ).length;
  };

  useEffect(() => {
    if (versions.length >= 2) {
      setSelectedVersionA((curr) => curr ?? versions[0]);
      setSelectedVersionB((curr) => curr ?? versions[1]);
      return;
    }

    if (versions.length === 1) {
      setSelectedVersionA((curr) => curr ?? versions[0]);
      setSelectedVersionB(null);
      return;
    }

    setSelectedVersionA(null);
    setSelectedVersionB(null);
  }, [versions]);

  const changeCount = countChanges(selectedVersionA, selectedVersionB);

  if (loading) {
    return (
      <TabPanel value={tabPage} index={7}>
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      </TabPanel>
    );
  }

  if (error) {
    return (
      <TabPanel value={tabPage} index={7}>
        <Typography color="error">
          Error loading history: {error.message}
        </Typography>
      </TabPanel>
    );
  }

  return (
    <TabPanel value={tabPage} index={7}>
      <Stack spacing={3}>
        <Typography variant="h6">
          Change History {changeCount > 0 && `(${changeCount} changes)`}
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl sx={{ minWidth: 250 }}>
            <InputLabel>Compare Version (Current)</InputLabel>
            <Select
              value={selectedVersionA?.version || ""}
              label="Compare Version (Current)"
              onChange={(e) => {
                const versionValue = Number(e.target.value);
                const v = versions.find(
                  (item) => item.version === versionValue
                );
                setSelectedVersionA(v || null);
              }}
            >
              {versions.map((v) => (
                <MenuItem key={v.version} value={v.version}>
                  v{v.version} - {formatDate(v.modifiedDate)} ({v.modifiedUser})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography>vs</Typography>

          <FormControl sx={{ minWidth: 250 }}>
            <InputLabel>Compare Version (Previous)</InputLabel>
            <Select
              value={selectedVersionB?.version || ""}
              label="Compare Version (Previous)"
              onChange={(e) => {
                const versionValue = Number(e.target.value);
                const v = versions.find(
                  (item) => item.version === versionValue
                );
                setSelectedVersionB(v || null);
              }}
            >
              {versions.map((v) => (
                <MenuItem key={v.version} value={v.version}>
                  v{v.version} - {formatDate(v.modifiedDate)} ({v.modifiedUser})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={showOnlyChanges}
                onChange={(e) => setShowOnlyChanges(e.target.checked)}
              />
            }
            label="Show only changes"
          />
        </Stack>

        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>Version</TableCell>
                <TableCell>Editor</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {versions.map((v) => (
                <TableRow
                  key={v.version}
                  hover
                  selected={
                    v.version === selectedVersionA?.version ||
                    v.version === selectedVersionB?.version
                  }
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>v{v.version}</TableCell>
                  <TableCell>{v.modifiedUser || "Unknown"}</TableCell>
                  <TableCell>{v.modifiedUserRole || "Unknown"}</TableCell>
                  <TableCell>{formatDate(v.modifiedDate)}</TableCell>
                  <TableCell>
                    {verificationStatusNames[v.verificationStatusId] ||
                      "Unknown"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedVersionA && selectedVersionB && (
          <VersionComparison
            versionA={selectedVersionA}
            versionB={selectedVersionB}
            showOnlyChanges={showOnlyChanges}
          />
        )}

        {versions.length === 0 && (
          <Typography>No change history available.</Typography>
        )}

        {versions.length === 1 && (
          <Typography>
            Only one version exists. No comparison available.
          </Typography>
        )}
      </Stack>
    </TabPanel>
  );
}

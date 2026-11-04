import { Chip, Stack } from "@mui/material";

function MuiChips() {
  return (
    <Stack p={2} spacing={1} direction="row" flexWrap="wrap" gap={1}>
      <Chip
        size="small"
        sx={{
          margin: "2px",
          display: "flex",
          flexDirection: "row-reverse",
          padding: "5px 10px 5px 10px",
        }}
        label="Search Criteria"
      />
      <Chip size="small" color="primary" label="Suggestion New" />
      <Chip size="small" color="secondary" label="Suggestion Pending" />
      <Chip size="small" color="default" label="Suggestion Incorrect" />
      <Chip size="small" color="default" label="Suggestion Confirmed" />
      <Chip
        size="small"
        color="inactiveButton"
        label="Temporarily/Permanently Closed"
      />
      <Chip size="small" color="success" label="Open Now" />
      <Chip size="small" color="mealProgram" label="Closing in <num> minutes" />
      <Chip size="small" color="primary" label="Walk-Ins Allowed" />
    </Stack>
  );
}

export default MuiChips;

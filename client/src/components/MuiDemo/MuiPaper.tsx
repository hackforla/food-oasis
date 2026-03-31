import { Paper, Stack } from "@mui/material";

function MuiPaper() {
  return (
    <Stack direction="row" spacing={1}>
      <Paper sx={{ m: 1, p: 1 }}>Elevation = (default)</Paper>
      <Paper elevation={0} sx={{ m: 1, p: 1 }}>
        Elevation = 0
      </Paper>
      <Paper elevation={2} sx={{ m: 1, p: 1 }}>
        Elevation = 2
      </Paper>
      <Paper elevation={4} sx={{ m: 1, p: 1 }}>
        Elevation = 4
      </Paper>
      <Paper elevation={8} sx={{ m: 1, p: 1 }}>
        Elevation = 8
      </Paper>
      <Paper elevation={16} sx={{ m: 1, p: 1 }}>
        Elevation = 16
      </Paper>
    </Stack>
  );
}

export default MuiPaper;

import { Stack, Box, Typography } from "@mui/material";

function MuiPalette() {
  return (
    <Stack direction="row" spacing={1} margin="1rem">
      <Stack direction="column" spacing={1}>
        <Box backgroundColor="primary.main" minWidth="10rem">
          <Typography>primary.main</Typography>
        </Box>
        <Box backgroundColor="primary.light">
          <Typography>primary.light</Typography>
        </Box>
        <Box backgroundColor="primary.dark">
          <Typography>primary.dark</Typography>
        </Box>
      </Stack>
      <Stack direction="column" spacing={1}>
        <Box backgroundColor="secondary.main" minWidth="10rem">
          <Typography>secondary.main</Typography>
        </Box>
        <Box backgroundColor="secondary.light">
          <Typography>secondary.light</Typography>
        </Box>
        <Box backgroundColor="secondary.dark">
          <Typography>secondary.dark</Typography>
        </Box>
      </Stack>
      <Stack direction="column" spacing={1}>
        <Box backgroundColor="error.main" minWidth="10rem">
          <Typography>error.main</Typography>
        </Box>
        <Box backgroundColor="error.light">
          <Typography>error.light</Typography>
        </Box>
        <Box backgroundColor="error.dark">
          <Typography>error.dark</Typography>
        </Box>
      </Stack>

      <Stack direction="column" spacing={1}>
        <Box backgroundColor="info.main" minWidth="10rem">
          <Typography>info.main</Typography>
        </Box>
        <Box backgroundColor="info.light">
          <Typography>info.light</Typography>
        </Box>
        <Box backgroundColor="info.dark">
          <Typography>info.dark</Typography>
        </Box>
      </Stack>

      <Stack direction="column" spacing={1}>
        <Box backgroundColor="warning.main" minWidth="10rem">
          <Typography>warning.main</Typography>
        </Box>
        <Box backgroundColor="warning.light">
          <Typography>warning.light</Typography>
        </Box>
        <Box backgroundColor="warning.dark">
          <Typography>warning.dark</Typography>
        </Box>
      </Stack>

      <Stack direction="column" spacing={1}>
        <Box backgroundColor="success.main" minWidth="10rem">
          <Typography>success.main</Typography>
        </Box>
        <Box backgroundColor="success.light">
          <Typography>success.light</Typography>
        </Box>
        <Box backgroundColor="success.dark">
          <Typography>success.dark</Typography>
        </Box>
      </Stack>
    </Stack>
  );
}

export default MuiPalette;

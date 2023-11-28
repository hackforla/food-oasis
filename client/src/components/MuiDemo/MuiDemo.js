import { Card, CardContent, CardHeader, Container, Stack } from "@mui/material";
import MuiButtons from "./MuiButtons";
import MuiChips from "./MuiChips";
import MuiLink from "./MuiLink";
import MuiPalette from "./MuiPalette";
import MuiPaper from "./MuiPaper";
import MuiTextField from "./MuiTextField";
import MuiTypography from "./MuiTypography";

function MuiDemo() {
  return (
    <Container backgroundcolor="secondary" spacing={1}>
      <Stack
        direction="column"
        spacing={1}
        sx={{ border: "1px solid black", padding: "1rem" }}
      >
        <Card variant="outlined">
          <CardHeader title="Buttons"></CardHeader>
          <CardContent>
            <MuiButtons />
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardHeader title="Links"></CardHeader>
          <CardContent>
            <MuiLink />
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardHeader title="Color Palette"></CardHeader>
          <CardContent>
            <MuiPalette />
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardHeader title="Typography"></CardHeader>
          <CardContent>
            <MuiTypography />
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardHeader title="TextFields"></CardHeader>
          <CardContent>
            <MuiTextField />
          </CardContent>
        </Card>

        <Card spacing={1}>
          <CardHeader title="Paper" />
          <MuiPaper />
        </Card>

        <Card spacing={1}>
          <CardHeader title="Chips" />
          <MuiChips />
        </Card>
      </Stack>
    </Container>
  );
}

export default MuiDemo;

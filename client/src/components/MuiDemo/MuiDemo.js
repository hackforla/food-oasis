import { Card, CardContent, CardHeader } from "@mui/material";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import MuiPalette from "./MuiPalette";
import MuiTypography from "./MuiTypography";
import MuiButtons from "./MuiButtons";
import MuiLink from "./MuiLink";
import MuiTextField from "./MuiTextField";
import MuiPaper from "./MuiPaper";

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

        <Card spacing={1} sx={{ spacing: 1 }}>
          <CardHeader title="Paper" />
          <MuiPaper />
        </Card>
      </Stack>
    </Container>
  );
}

export default MuiDemo;

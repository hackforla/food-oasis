import { Stack, Box, Typography } from "@mui/material";
import {
  PrimaryButton,
  SecondaryButton,
  IconButton,
} from "../UI/StandardButton";

function MuiButtons() {
  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="subtitle1" component="h3">
        Primary
      </Typography>
      <Box
        sx={{
          padding: "0.5rem",
          backgroundColor: "lightgray",
          border: "1px solid black",
          borderRadius: "4px",
        }}
      >
        <Stack direction="row">
          <PrimaryButton>Normal</PrimaryButton>
          <PrimaryButton>Normal</PrimaryButton>
          <PrimaryButton disabled>Disabled</PrimaryButton>
        </Stack>
      </Box>
      <Typography variant="subtitle1" component="h3">
        Primary (Light Background)
      </Typography>
      <Box
        sx={{
          padding: "0.5rem",
          backgroundColor: "white",
          border: "1px solid black",
          borderRadius: "4px",
        }}
      >
        <Stack direction="row">
          <PrimaryButton>Normal</PrimaryButton>
          <PrimaryButton>Normal</PrimaryButton>
          <PrimaryButton disabled>Disabled</PrimaryButton>
        </Stack>
      </Box>
      <Typography variant="subtitle1" component="h3">
        Primary (Dark Background)
      </Typography>
      <Box
        sx={{
          padding: "0.5rem",
          backgroundColor: "black",
          borderRadius: "4px",
        }}
      >
        <Stack direction="row">
          <PrimaryButton>Normal</PrimaryButton>
          <PrimaryButton>Normal</PrimaryButton>
          <PrimaryButton disabled>Disabled</PrimaryButton>
        </Stack>
      </Box>
      <Typography variant="subtitle1" component="h3">
        Sizing Test
      </Typography>
      <Box padding=".2rem">
        <Stack direction="row" alignItems="center">
          <Box
            sx={{
              height: "3rem",
              width: "8rem",
              backgroundColor: "lightgray",
              border: "1px solid black",
            }}
          >
            <PrimaryButton>Small Space</PrimaryButton>
          </Box>
          <Box
            sx={{
              backgroundColor: "lightgray",
              border: "1px solid black",
            }}
          >
            <PrimaryButton>Enough Space</PrimaryButton>
          </Box>
          <Box
            sx={{
              height: "12rem",
              width: "36rem",
              backgroundColor: "lightgray",
              border: "1px solid black",
            }}
          >
            <PrimaryButton>Extra Space</PrimaryButton>
          </Box>
        </Stack>
      </Box>

      {/* <Typography variant="subtitle1" component="h3">
        Sizing Test of Unstyled MUI Button
      </Typography>
      <Box padding=".2rem">
        <Stack direction="row" alignItems="center">
          <Box
            sx={{
              height: "2rem",
              width: "4rem",
              backgroundColor: "lightgray",
              border: "1px solid black",
              overflow: "clip",
            }}
          >
            <Button>Small Space</Button>
          </Box>
          <Box
            sx={{
              backgroundColor: "lightgray",
              border: "1px solid black",
              overflow: "clip",
            }}
          >
            <Button>Enough Space</Button>
          </Box>
          <Box
            sx={{
              height: "12rem",
              width: "36rem",
              backgroundColor: "lightgray",
              border: "1px solid black",
              overflow: "clip",
            }}
          >
            <Button>Extra Space</Button>
          </Box>
        </Stack>
      </Box> */}

      <Typography variant="subtitle1" component="h3">
        Secondary
      </Typography>
      <Box
        sx={{
          padding: "0.5rem",
          backgroundColor: "lightgray",
          border: "1px solid black",
          borderRadius: "4px",
        }}
      >
        <Stack direction="row">
          <SecondaryButton>Normal</SecondaryButton>
          <SecondaryButton>Normal</SecondaryButton>
          <SecondaryButton disabled>Disabled</SecondaryButton>
        </Stack>
      </Box>
      <Typography variant="subtitle1" component="h3">
        Secondary (Light Background)
      </Typography>
      <Box
        sx={{
          padding: "0.5rem",
          backgroundColor: "white",
          border: "1px solid black",
          borderRadius: "4px",
        }}
      >
        <Stack direction="row">
          <SecondaryButton>Normal</SecondaryButton>
          <SecondaryButton>Normal</SecondaryButton>
          <SecondaryButton disabled>Disabled</SecondaryButton>
        </Stack>
      </Box>
      <Typography variant="subtitle1" component="h3">
        Secondary (Dark Background)
      </Typography>
      <Box
        sx={{
          padding: "0.5rem",
          backgroundColor: "black",
          borderRadius: "4px",
        }}
      >
        <Stack direction="row">
          <SecondaryButton>Normal</SecondaryButton>
          <SecondaryButton>Normal</SecondaryButton>
          <SecondaryButton disabled>Disabled</SecondaryButton>
        </Stack>
      </Box>

      <Typography variant="subtitle1" component="h3">
        Sizing Test
      </Typography>
      <Box padding=".2rem">
        <Stack direction="row" alignItems="center">
          <Box
            sx={{
              height: "3rem",
              width: "8rem",
              backgroundColor: "lightgray",
              border: "1px solid black",
            }}
          >
            <SecondaryButton>Small Space</SecondaryButton>
          </Box>
          <Box
            sx={{
              backgroundColor: "lightgray",
              border: "1px solid black",
            }}
          >
            <SecondaryButton>Enough Space</SecondaryButton>
          </Box>
          <Box
            sx={{
              height: "12rem",
              width: "36rem",
              backgroundColor: "lightgray",
              border: "1px solid black",
            }}
          >
            <SecondaryButton>Extra Space</SecondaryButton>
          </Box>
        </Stack>
      </Box>

      <Typography variant="subtitle1" component="h3">
        IconButtons
      </Typography>
      <Box padding=".2rem" backgroundColor="white">
        <Stack direction="row">
          <IconButton icon="check" color="success" disabled />
          <IconButton icon="add" color="primary" />
          <IconButton icon="arrowUp" color="secondary" size="large" />
          <IconButton icon="arrowDown" size="large" />
          <IconButton icon="cancel" color="error" size="small" />
          <IconButton icon="delete" color="error" size="small" />
          <IconButton icon="locationOn" color="primary" />
          <IconButton icon="details" color="primary" />
          <IconButton icon="edit" color="primary" />
          <IconButton icon="locationSearching" color="primary" />
        </Stack>
      </Box>
    </Stack>
  );
}

export default MuiButtons;

import { Box, Button, Stack, Typography } from "@mui/material";
import { IconButton } from "../UI/StandardButton";

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
          <Button variant="contained">Normal</Button>
          <Button variant="contained">Normal</Button>
          <Button variant="contained" disabled>
            Disabled
          </Button>
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
          <Button variant="contained">Normal</Button>
          <Button variant="contained">Normal</Button>
          <Button variant="contained" disabled>
            Disabled
          </Button>
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
          <Button variant="contained">Normal</Button>
          <Button variant="contained">Normal</Button>
          <Button variant="contained" disabled>
            Disabled
          </Button>
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
            <Button variant="contained">Small Space</Button>
          </Box>
          <Box
            sx={{
              backgroundColor: "lightgray",
              border: "1px solid black",
            }}
          >
            <Button variant="contained">Enough Space</Button>
          </Box>
          <Box
            sx={{
              height: "12rem",
              width: "36rem",
              backgroundColor: "lightgray",
              border: "1px solid black",
            }}
          >
            <Button variant="contained">Extra Space</Button>
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
          <Button variant="outlined">Normal</Button>
          <Button variant="outlined">Normal</Button>
          <Button variant="outlined" disabled>
            Disabled
          </Button>
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
          <Button variant="outlined">Normal</Button>
          <Button variant="outlined">Normal</Button>
          <Button variant="outlined" disabled>
            Disabled
          </Button>
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
          <Button variant="outlined">Normal</Button>
          <Button variant="outlined">Normal</Button>
          <Button variant="outlined" disabled>
            Disabled
          </Button>
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
            <Button variant="outlined">Small Space</Button>
          </Box>
          <Box
            sx={{
              backgroundColor: "lightgray",
              border: "1px solid black",
            }}
          >
            <Button variant="outlined">Enough Space</Button>
          </Box>
          <Box
            sx={{
              height: "12rem",
              width: "36rem",
              backgroundColor: "lightgray",
              border: "1px solid black",
            }}
          >
            <Button variant="outlined">Extra Space</Button>
          </Box>
        </Stack>
      </Box>

      <Typography variant="subtitle1" component="h3">
        Gray
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
          <Button variant="gray">Normal</Button>
          <Button variant="gray">Normal</Button>
          <Button variant="gray" disabled>
            Disabled
          </Button>
        </Stack>
      </Box>
      <Typography variant="subtitle1" component="h3">
        Gray (Light Background)
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
          <Button variant="gray">Normal</Button>
          <Button variant="gray">Normal</Button>
          <Button variant="gray" disabled>
            Disabled
          </Button>
        </Stack>
      </Box>
      <Typography variant="subtitle1" component="h3">
        Gray (Dark Background)
      </Typography>
      <Box
        sx={{
          padding: "0.5rem",
          backgroundColor: "black",
          borderRadius: "4px",
        }}
      >
        <Stack direction="row">
          <Button variant="gray">Normal</Button>
          <Button variant="gray">Normal</Button>
          <Button variant="gray" disabled>
            Disabled
          </Button>
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
            <Button variant="gray">Small Space</Button>
          </Box>
          <Box
            sx={{
              backgroundColor: "lightgray",
              border: "1px solid black",
            }}
          >
            <Button variant="gray">Enough Space</Button>
          </Box>
          <Box
            sx={{
              height: "12rem",
              width: "36rem",
              backgroundColor: "lightgray",
              border: "1px solid black",
            }}
          >
            <Button variant="gray">Extra Space</Button>
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

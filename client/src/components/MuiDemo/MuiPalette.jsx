import { Box, Stack, Typography } from "@mui/material";

const PaletteSwatch = ({ hexColor, name, textColor, children }) => {
  return (
    <Box
      sx={{
        backgroundColor: name,
        minHeight: "3rem",
        minWidth: "20rem",
        color: { textColor },
      }}
    >
      <Typography color={textColor}>{hexColor}</Typography>
      <Typography color={textColor}>{name}</Typography>
      <Box sx={{ marginLeft: "1.5em", color: "white" }}>{children}</Box>
    </Box>
  );
};

function MuiPalette() {
  return (
    <Stack direction="column" spacing={1} margin="1rem">
      <Stack direction="row" spacing={1}>
        <PaletteSwatch
          name="primary.extralight"
          hexColor="#CBE3F1"
          textColor="#FFFFFF"
        >
          <ul>
            <li>Secondary Button</li>
          </ul>
        </PaletteSwatch>
        <PaletteSwatch
          name="primary.light"
          hexColor="#6098CD"
          textColor="#FFFFFF"
        >
          <ul>
            <li>Secondary Button</li>
          </ul>
        </PaletteSwatch>
        <PaletteSwatch
          name="primary.main"
          hexColor="#336699"
          textColor="#FFFFFF"
        >
          <ul>
            <li>Primary Button</li>
          </ul>
        </PaletteSwatch>
        <PaletteSwatch
          name="primary.dark"
          hexColor="#264A79"
          textColor="#FFFFFF"
        />
      </Stack>

      <Stack direction="row" spacing={1}>
        {/* <PaletteSwatch
          name="primary.light"
          hexColor="#6098CD"
          textColor="#FFFFFF"
        /> */}
        <PaletteSwatch
          name="secondary.main"
          hexColor="#E57109"
          textColor="#FFFFFF"
        />
        {/* <PaletteSwatch
          name="primary.dark"
          hexColor="#264A79"
          textColor="#FFFFFF"
        /> */}
      </Stack>

      <Stack direction="row" spacing={1}>
        <PaletteSwatch
          name="inactiveButton.light"
          hexColor="#D0D0D0"
          textColor="#FFFFFF"
        />
        <PaletteSwatch
          name="inactiveButton.main"
          hexColor="#949494"
          textColor="#FFFFFF"
        >
          <ul>
            <li>Primary Button</li>
            <li>Secondary Button</li>
          </ul>
        </PaletteSwatch>
        <PaletteSwatch
          name="inactiveButton.dark"
          hexColor="#909090"
          textColor="#FFFFFF"
        ></PaletteSwatch>
      </Stack>

      <Stack direction="row" spacing={1}>
        {/* <PaletteSwatch
          name="success.light"
          hexColor="#D0D0D0"
          textColor="#FFFFFF"
        /> */}
        <PaletteSwatch
          name="success.main"
          hexColor="#219653"
          textColor="#FFFFFF"
        />
        {/* <PaletteSwatch
          name="success.dark"
          hexColor="#909090"
          textColor="#FFFFFF"
        /> */}
      </Stack>

      <Stack direction="row" spacing={1}>
        <PaletteSwatch
          name="link.normal"
          hexColor="#1976D2"
          textColor="#FFFFFF"
        />
        <PaletteSwatch
          name="link.hovered"
          hexColor="#004BA0"
          textColor="#FFFFFF"
        />
        <PaletteSwatch
          name="link.visited"
          hexColor="#551A8B"
          textColor="#FFFFFF"
        />
      </Stack>

      <Stack direction="row" spacing={1}>
        <PaletteSwatch
          name="common.black"
          hexColor="#313233"
          textColor="#FFFFFF"
        />
        <PaletteSwatch
          name="common.gray"
          hexColor="#545454"
          textColor="#FFFFFF"
        />
        <PaletteSwatch
          name="common.white"
          hexColor="#FFFFFF"
          textColor="#000000"
        />
        <PaletteSwatch
          name="common.disabled"
          hexColor="#A0A0A0"
          textColor="#FFFFFF"
        />
      </Stack>
      <Stack direction="row" spacing={1}>
        <PaletteSwatch
          name="mealProgram.main"
          hexColor="#E57109"
          textColor="#FFFFFF"
        />
      </Stack>

      <Stack direction="row" spacing={1}>
        <PaletteSwatch
          name="foodPantry.main"
          hexColor="#336699"
          textColor="#FFFFFF"
        />
      </Stack>

      <Stack direction="row" spacing={1}>
        <PaletteSwatch
          name="headingText.main"
          hexColor="#1B1B1B"
          textColor="#FFFFFF"
        >
          <ul>
            <li>typography (not body1 or body2)</li>
          </ul>
        </PaletteSwatch>
      </Stack>

      <Stack direction="row" spacing={1}>
        <PaletteSwatch
          name="bodyText.main"
          hexColor="#313233"
          textColor="#FFFFFF"
        >
          <ul>
            <li>body1, body2 typography</li>
          </ul>
        </PaletteSwatch>
      </Stack>

      <Stack direction="row" spacing={1}>
        <PaletteSwatch
          name="confirmed.main"
          hexColor="#008000"
          textColor="#FFFFFF"
        />
      </Stack>
    </Stack>
  );
}

export default MuiPalette;

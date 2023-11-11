import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Checkbox,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MealIconNoBorder from "icons/MealIconNoBorder";
import PantryIconNoBorder from "icons/PantryIconNoBorder";

const drawerWidth = 240;
const DrawerHeader = styled("div")(({ theme }) => ({
  // display: "flex",
  alignItems: "center",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function FilterPanel({ setOpen, open, mealPantry }) {
  const { toggleMeal, togglePantry, isMealSelected, isPantrySelected } =
    mealPantry;

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          "width": drawerWidth,
          "flexShrink": 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          {/* todo 
          - styling
            - placement of the filter panel to sit below the logo
            - typography
            - sizing 
            - needs > clarification on 
                - Day and Open Time dropdown
                - requirements checkbox
           */}
          <Typography variant="h3" textAlign="center">
            Filters
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key="Pantry" disablePadding>
            <ListItemButton>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "#00C851",
                      },
                    }}
                    checked={isPantrySelected}
                    onChange={togglePantry}
                  />
                }
                label={
                  <Stack direction="row" alignItems="center">
                    <PantryIconNoBorder width="20px" height="20px" />
                    <ListItemText
                      primary="Pantry"
                      sx={{
                        marginLeft: 1,
                      }}
                    />
                  </Stack>
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem key="Meal" disablePadding>
            <ListItemButton>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "#00C851",
                      },
                    }}
                    checked={isMealSelected}
                    onChange={toggleMeal}
                  />
                }
                label={
                  <Stack direction="row" alignItems="center">
                    <MealIconNoBorder width="20px" height="20px" />
                    <ListItemText
                      primary="Meal"
                      sx={{
                        marginLeft: 1,
                      }}
                    />
                  </Stack>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <FormControl>
          <Typography variant="h5" textAlign="center">
            <FormLabel id="time-selection">Time Type</FormLabel>
          </Typography>
          <RadioGroup
            aria-labelledby="time-selection"
            defaultValue="Show All"
            name="radio-buttons-group"
          >
            {["Show All", "Open Now", "WIP-DAY"].map((text) => (
              <FormControlLabel
                value={text}
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: "#00C851",
                      },
                    }}
                  />
                }
                label={text}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Divider />
        <Typography variant="h5" textAlign="center">
          Requirements
        </Typography>
        <ListItem key="requirements" disablePadding>
          <ListItemButton>
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "#00C851",
                },
              }}
            />
            <ListItemText primary="No Known Elegibility Requirements" />
          </ListItemButton>
        </ListItem>
      </Drawer>
    </Box>
  );
}

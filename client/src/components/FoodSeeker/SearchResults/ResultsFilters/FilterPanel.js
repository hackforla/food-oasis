import { useState } from "react";
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
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MealIconNoBorder from "icons/MealIconNoBorder";
import PantryIconNoBorder from "icons/PantryIconNoBorder";

const drawerWidth = 340;
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
  const [openTimeValue, setoOpenTimeValue] = useState({ day: "", time: "" });

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleOpenTimeChange(dayOrTime, event) {
    setoOpenTimeValue({ ...openTimeValue, [dayOrTime]: event.target.value });
  }

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
            {["Show All", "Open Now"].map((text) => (
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
            <FormControlLabel
              value="day"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#00C851",
                    },
                  }}
                />
              }
              label={
                <Stack direction="row" sx={{ width: "100%" }} gap={2}>
                  {Object.keys(openTime).map((key) => (
                    <Select
                      labelId={`${key}-label`}
                      id={`${key}-select`}
                      value={openTimeValue[key]}
                      onChange={(e) => handleOpenTimeChange(key, e)}
                      displayEmpty
                      renderValue={(selected) =>
                        selected.length === 0 ? (
                          <em>{openTime[key].placeholder}</em>
                        ) : (
                          selected
                        )
                      }
                      MenuProps={{
                        sx: { maxHeight: 180, width: "fit-content" },
                      }}
                    >
                      {openTime[key].items.map((dayOrTime) => (
                        <MenuItem
                          key={dayOrTime.value}
                          label={dayOrTime.label}
                          value={dayOrTime.label}
                        >
                          {dayOrTime.label}
                        </MenuItem>
                      ))}
                    </Select>
                  ))}
                </Stack>
              }
            />
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

const openTime = {
  day: {
    placeholder: "DAY",
    items: [
      { label: "SUN", value: "Sun" },
      { label: "MON", value: "Mon" },
      { label: "TUE", value: "Tue" },
      { label: "WED", value: "Wed" },
      { label: "THU", value: "Thu" },
      { label: "FRI", value: "Fri" },
      { label: "SAT", value: "Sat" },
    ],
  },
  time: {
    placeholder: "Open Time",
    items: [
      { label: "12:00AM", value: "00" },
      { label: "01:00AM", value: "01" },
      { label: "02:00AM", value: "02" },
      { label: "03:00AM", value: "03" },
      { label: "04:00AM", value: "04" },
      { label: "05:00AM", value: "05" },
      { label: "06:00AM", value: "06" },
      { label: "07:00AM", value: "07" },
      { label: "08:00AM", value: "08" },
      { label: "09:00AM", value: "09" },
      { label: "10:00AM", value: "10" },
      { label: "11:00AM", value: "11" },
      { label: "12:00PM", value: "12" },
      { label: "01:00PM", value: "13" },
      { label: "02:00PM", value: "14" },
      { label: "03:00PM", value: "15" },
      { label: "04:00PM", value: "16" },
      { label: "05:00PM", value: "17" },
      { label: "06:00PM", value: "18" },
      { label: "07:00PM", value: "19" },
      { label: "08:00PM", value: "20" },
      { label: "09:00PM", value: "21" },
      { label: "10:00PM", value: "22" },
      { label: "11:00PM", value: "23" },
    ],
  },
};

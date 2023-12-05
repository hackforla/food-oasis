import CloseIcon from "@mui/icons-material/Close";
import {
  Checkbox,
  Divider,
  Drawer,
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
import useBreakpoints from "hooks/useBreakpoints";
import MealIconNoBorder from "icons/MealIconNoBorder";
import PantryIconNoBorder from "icons/PantryIconNoBorder";
import { useState } from "react";
import { useAppDispatch, useFilterPanel } from "../../../../appReducer";

const DrawerHeader = styled("div")(({ _theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const checkedStyle = {
  "&.Mui-checked": {
    color: "#00C851",
  },
};

const yPadding = { py: 2 };

export default function FilterPanel({ mealPantry }) {
  const { isDesktop } = useBreakpoints();
  const drawerWidth = isDesktop ? 340 : "100%";
  const drawerHeight = isDesktop ? "100%" : "50%";

  const { toggleMeal, togglePantry, isMealSelected, isPantrySelected } =
    mealPantry;
  const [openTimeValue, setoOpenTimeValue] = useState({ day: "", time: "" });
  const dispatch = useAppDispatch();
  const open = useFilterPanel();

  const handleDrawerClose = () => {
    dispatch({
      type: "FILTER_PANEL_TOGGLE",
      filterPanel: !open,
    });
  };

  function handleOpenTimeChange(dayOrTime, event) {
    setoOpenTimeValue({ ...openTimeValue, [dayOrTime]: event.target.value });
  }

  return (
    <Drawer
      sx={{
        "flexShrink": 0,
        "& .MuiDrawer-paper": {
          top: "auto",
          width: drawerWidth,
          height: drawerHeight,
          boxSizing: "border-box",
          padding: "1rem",
        },
      }}
      variant="persistent"
      anchor={isDesktop ? "left" : "bottom"}
      open={open}
    >
      <DrawerHeader>
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ py: 2, color: "#747476" }}
        >
          Filters
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Typography variant="h4" sx={yPadding}>
        Category
      </Typography>
      <List>
        {["Pantry", "Meal"].map((category) => (
          <ListItem key={category} sx={{ padding: 0 }}>
            <ListItemButton sx={{ padding: 0 }}>
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    sx={checkedStyle}
                    checked={
                      category === "Pantry" ? isPantrySelected : isMealSelected
                    }
                    onChange={category === "Pantry" ? togglePantry : toggleMeal}
                  />
                }
                label={
                  <Stack direction="row" alignItems="center">
                    {category === "Pantry" ? (
                      <PantryIconNoBorder width="20px" height="20px" />
                    ) : (
                      <MealIconNoBorder width="20px" height="20px" />
                    )}
                    <ListItemText
                      primary={category}
                      sx={{
                        marginLeft: 1,
                      }}
                    />
                  </Stack>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <FormLabel id="time-selection">
        <Typography variant="h4" sx={yPadding}>
          Open Time
        </Typography>
      </FormLabel>
      <RadioGroup
        aria-labelledby="time-selection"
        defaultValue="Show All"
        name="radio-buttons-group"
        sx={{
          flexDirection: "column",
          display: "flex",
          gap: (theme) => theme.spacing(2),
        }}
      >
        {["Show All", "Open Now"].map((text) => (
          <FormControlLabel
            key={text}
            value={text}
            control={<Radio sx={checkedStyle} />}
            label={text}
          />
        ))}
        <FormControlLabel
          key="day"
          value="day"
          control={<Radio sx={checkedStyle} />}
          label={
            <Stack direction="row" sx={{ width: "100%" }} gap={2}>
              {Object.keys(openTime).map((key) => (
                <Select
                  labelId={`${key}-label`}
                  id={`${key}-select`}
                  key={`${key}-select`}
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

      <Divider sx={{ mt: 2 }} />
      <Typography variant="h4" sx={yPadding}>
        Requirements
      </Typography>
      <ListItem key="requirements" sx={{ padding: 0 }}>
        <ListItemButton sx={{ padding: 0 }}>
          <FormControlLabel
            control={<Checkbox sx={checkedStyle} />}
            label={
              <ListItemText
                primary="No Known Elegibility Requirements"
                sx={{
                  marginLeft: 1,
                }}
              />
            }
          />
        </ListItemButton>
      </ListItem>
    </Drawer>
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

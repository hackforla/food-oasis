import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
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
import {
  useAppDispatch,
  useFilterPanel,
  useOpenTimeFilter,
  useNoKnownEligibilityRequirementsFilter,
} from "../../../../appReducer";
import { getDayTimeNow } from "helpers";

const checkedStyle = {
  "&.Mui-checked": {
    color: "#00C851",
  },
};

const yPadding = { py: 2 };

export default function FilterPanel({ mealPantry }) {
  const { isDesktop } = useBreakpoints();
  const drawerWidth = isDesktop ? 340 : "100%";
  const drawerHeight = isDesktop ? `100%` : "50%";

  const { toggleMeal, togglePantry, isMealSelected, isPantrySelected } =
    mealPantry;
  const dispatch = useAppDispatch();
  const open = useFilterPanel();
  const openTime = useOpenTimeFilter();

  const handleRadioChange = (event) => {
    const name = event.target.name;
    let day, time;
    if (name === "Open Now") {
      const [dayNow, timeNow] = getDayTimeNow();
      day = dayNow;
      time = timeNow;
    }
    dispatch({
      type: "OPEN_TIME_FILTER_UPDATED",
      openTimeFilter: {
        radio: name,
        day: name === "Open Now" ? day : "",
        time: name === "Open Now" ? time : "",
      },
    });
  };

  const handleOpenTimeChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch({
      type: "OPEN_TIME_FILTER_UPDATED",
      openTimeFilter: { ...openTime, [name]: value },
    });
  };

  const noKnownEligibilityRequirementsFilter =
    useNoKnownEligibilityRequirementsFilter();

  const handleDrawerClose = () => {
    dispatch({
      type: "FILTER_PANEL_TOGGLE",
      filterPanel: !open,
    });
  };

  return (
    <Drawer
      sx={{
        height: "100%",
        position: isDesktop ? "absolute" : undefined,
        top: isDesktop ? "0" : undefined,

        "& .MuiDrawer-paper": {
          position: isDesktop ? "absolute" : undefined,
          top: isDesktop ? "0" : undefined,
          width: drawerWidth,
          height: drawerHeight,
          boxSizing: "border-box",
        },
      }}
      variant={isDesktop ? "persistent" : "temporary"}
      anchor={isDesktop ? "left" : "bottom"}
      open={open}
    >
      <Box
        sx={(theme) => ({
          padding: "0 1rem 0 1rem",
          position: "sticky",
          top: 0,
          backgroundColor: theme.palette.background.paper,
          zIndex: 1,
        })}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          py={2}
        >
          <Typography variant="h3" textAlign="center" color="common.grey">
            Filters
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
      </Box>
      <Box sx={{ padding: "0 1rem 1rem 1rem", overflowY: "auto" }}>
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
                        category === "Pantry"
                          ? isPantrySelected
                          : isMealSelected
                      }
                      onChange={
                        category === "Pantry" ? togglePantry : toggleMeal
                      }
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
          value={openTime.radio}
          name="radio-buttons-group"
          onChange={handleRadioChange}
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
              control={<Radio name={text} sx={checkedStyle} />}
              label={text}
            />
          ))}
          <FormControlLabel
            key="Customized"
            value="Customized"
            control={<Radio name="Customized" sx={checkedStyle} />}
            label={
              <Stack direction="row" sx={{ width: "100%" }} gap={2}>
                {["day", "time"].map((key) => {
                  return (
                    <Select
                      disabled={openTime.radio !== "Customized"}
                      labelId={`${key}-label`}
                      id={`${key}-select`}
                      key={`${key}-select`}
                      name={key}
                      value={openTime[key]}
                      onChange={(e) => handleOpenTimeChange(e)}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <em>{OPEN_TIME_DROPDOWNS[key].placeholder}</em>
                          );
                        }
                        return selected;
                      }}
                      MenuProps={{
                        sx: { maxHeight: 180, width: "fit-content" },
                      }}
                    >
                      {OPEN_TIME_DROPDOWNS[key].labels.map((label) => (
                        <MenuItem key={label} label={label} value={label}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                  );
                })}
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
              control={
                <Checkbox
                  checked={noKnownEligibilityRequirementsFilter}
                  onChange={() =>
                    dispatch({
                      type: "NO_KNOWN_ELIGIBILITY_REQUIREMENTS_FILTER_TOGGLE",
                      noKnownEligibilityRequirementsFilter:
                        !noKnownEligibilityRequirementsFilter,
                    })
                  }
                  sx={checkedStyle}
                />
              }
              label={
                <ListItemText
                  primary="No Known Eligibility Requirements"
                  sx={{
                    marginLeft: 1,
                  }}
                />
              }
            />
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
}

const OPEN_TIME_DROPDOWNS = {
  day: {
    placeholder: "DAY",
    labels: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
  },
  time: {
    placeholder: "Open Time",
    labels: [
      "12:00AM",
      "01:00AM",
      "02:00AM",
      "03:00AM",
      "04:00AM",
      "05:00AM",
      "06:00AM",
      "07:00AM",
      "08:00AM",
      "09:00AM",
      "10:00AM",
      "11:00AM",
      "12:00PM",
      "01:00PM",
      "02:00PM",
      "03:00PM",
      "04:00PM",
      "05:00PM",
      "06:00PM",
      "07:00PM",
      "08:00PM",
      "09:00PM",
      "10:00PM",
      "11:00PM",
    ],
  },
};

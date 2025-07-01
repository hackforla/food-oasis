import { useState } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { FieldArray, getIn } from "formik";
import useBreakpoints from "hooks/useBreakpoints";
import PropTypes from "prop-types";
import { disabledText, error } from "theme/palette";
import { IconButton } from "../UI/StandardButton";
import Label from "./ui/Label";

const OpenTimeForm = ({
  handleBlur,
  touched,
  errors,
  values,
  setFieldValue,
  setFieldTouched,
}) => {
  const addIcon = <AddIcon />;
  const { isMobile } = useBreakpoints();
  const days = [
    { label: "Select day...", value: "" },
    { label: "Sun", value: "Sun" },
    { label: "Mon", value: "Mon" },
    { label: "Tue", value: "Tue" },
    { label: "Wed", value: "Wed" },
    { label: "Thu", value: "Thu" },
    { label: "Fri", value: "Fri" },
    { label: "Sat", value: "Sat" },
  ];

  const intervals = [
    { label: "Repeat...", value: "" },
    { label: "Every", value: 0 },
    { label: "First", value: 1 },
    { label: "Second", value: 2 },
    { label: "Third", value: 3 },
    { label: "Fourth", value: 4 },
    { label: "Last", value: -1 },
  ];

  const [closeTimeErrorss, setCloseTimeErrorss] = useState({});

  // const closeTimeErrorsMessage =
  //   closeTimeErrors === "minTime"
  //     ? "Closing time must be after opening time"
  //     : "";

  const getCloseTimeErrorsMessage = (index) => {
    const errorType = closeTimeErrorss[index];
    if (errorType === "minTime")
      return "Closing time must be after opening time";
    if (errorType === "equalTime")
      return "Closing time must be different from opening time";
    return "";
  };

  return (
    <Card style={{ border: "1px solid lightgray", borderRadius: "4px" }}>
      <CardContent>
        <Label id="businessHours" label="Business Hours" />
        <FieldArray name="hours">
          {({ remove, insert, push }) => (
            <div>
              {values?.hours?.length > 0 &&
                values?.hours.map((hour, index) => {
                  //weekOfMonth`
                  const weekOfMonth = `hours[${index}].weekOfMonth`;
                  const touchedMonth = getIn(touched, weekOfMonth);
                  const errorMonth = getIn(errors, weekOfMonth);

                  //dayOfWeek
                  const dayOfWeek = `hours[${index}].dayOfWeek`;
                  const touchedWeek = getIn(touched, dayOfWeek);
                  const errorWeek = getIn(errors, dayOfWeek);

                  //open time
                  const open = `hours[${index}].open`;
                  const touchedOpen = getIn(touched, open);
                  const errorOpen = getIn(errors, open);

                  //close time
                  const close = `hours[${index}].close`;
                  const touchedClose = getIn(touched, close);
                  const errorClose = getIn(errors, close);

                  return (
                    <div key={index}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid container spacing={1}>
                          <Grid item xs={8} sm={2}>
                            <FormControl variant="outlined" fullWidth>
                              <Select
                                id="interval-select"
                                name={weekOfMonth}
                                onChange={(e) =>
                                  setFieldValue(weekOfMonth, e.target.value)
                                }
                                onBlur={handleBlur}
                                value={hour.weekOfMonth}
                                sx={{
                                  color:
                                    hour.weekOfMonth === ""
                                      ? Boolean(touchedMonth && errorMonth)
                                        ? error
                                        : disabledText
                                      : "inherit",
                                  fontStyle:
                                    hour.weekOfMonth === ""
                                      ? "italic"
                                      : "inherit",
                                }}
                                displayEmpty
                                error={Boolean(touchedMonth && errorMonth)}
                              >
                                {intervals.map((day) => (
                                  <MenuItem key={day.value} value={day.value}>
                                    {day.label}
                                  </MenuItem>
                                ))}
                              </Select>
                              {touchedMonth && errorMonth ? (
                                <FormHelperText error>
                                  Repeat Interval is required
                                </FormHelperText>
                              ) : null}
                            </FormControl>
                          </Grid>
                          <Grid item xs={8} sm={2}>
                            <FormControl variant="outlined" fullWidth>
                              <Select
                                labelId="open-days-select-id"
                                id="open-days-select"
                                variant="outlined"
                                name={dayOfWeek}
                                onChange={(e) =>
                                  setFieldValue(dayOfWeek, e.target.value)
                                }
                                onBlur={handleBlur}
                                value={hour.dayOfWeek}
                                error={Boolean(touchedWeek && errorWeek)}
                                displayEmpty
                                sx={{
                                  color:
                                    hour.dayOfWeek === ""
                                      ? Boolean(touchedWeek && errorWeek)
                                        ? error
                                        : disabledText
                                      : "inherit",
                                  fontStyle:
                                    hour.dayOfWeek === ""
                                      ? "italic"
                                      : "inherit",
                                }}
                              >
                                {days.map((day) => (
                                  <MenuItem
                                    key={day.value}
                                    label={day.label}
                                    value={day.value}
                                  >
                                    {day.label}
                                  </MenuItem>
                                ))}
                              </Select>
                              {touchedWeek && errorWeek && (
                                <FormHelperText error>
                                  Day is required
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>

                          <Grid item xs={8} sm={3}>
                            <DesktopTimePicker
                              name={open}
                              value={
                                hour.open ? dayjs(hour.open, "HH:mm:ss") : null
                              }
                              onBlur={handleBlur}
                              onChange={(dt) => {
                                setFieldValue(
                                  open,
                                  dt && dt.isValid()
                                    ? dt.format("HH:mm:ss")
                                    : ""
                                );
                                setFieldTouched(open, true, true);
                              }}
                              onClose={(e) => {
                                setFieldTouched(open, true, true);
                              }}
                              slotProps={{
                                textField: {
                                  placeholder: "Enter opening time...",
                                  id: "openTime",
                                  variant: "outlined",
                                  helperText:
                                    errorOpen && touchedOpen
                                      ? "Opening time is required"
                                      : !isMobile && " ",
                                  error: touchedOpen && errorOpen,
                                },
                              }}
                              sx={{
                                "& .MuiOutlinedInput-input": {
                                  color:
                                    errorOpen && touchedOpen
                                      ? error
                                      : hour.open
                                      ? "inherit"
                                      : disabledText,
                                },
                                "& input::placeholder": {
                                  color:
                                    errorOpen && touchedOpen
                                      ? error
                                      : hour.open
                                      ? "inherit"
                                      : disabledText,
                                },
                              }}
                            />
                          </Grid>
                          <Grid item xs={8} sm={3}>
                            <DesktopTimePicker
                              name={close}
                              value={
                                hour.close
                                  ? dayjs(hour.close, "HH:mm:ss")
                                  : null
                              }
                              minTime={
                                hour.open
                                  ? dayjs(hour.open, "HH:mm:ss")
                                  : undefined
                              }
                              onError={(newError) =>
                                setCloseTimeErrorss((prev) => ({
                                  ...prev,
                                  [index]: newError,
                                }))
                              }
                              onBlur={() => setFieldTouched(close, true, true)}
                              onChange={(dt) => {
                                const openTime = hour.open
                                  ? dayjs(hour.open, "HH:mm:ss")
                                  : null;
                                const closeTime =
                                  dt && dt.isValid() ? dt : null;

                                if (openTime && closeTime) {
                                  if (closeTime.isBefore(openTime)) {
                                    setCloseTimeErrorss((prev) => ({
                                      ...prev,
                                      [index]: "minTime",
                                    }));
                                  } else if (closeTime.isSame(openTime)) {
                                    setCloseTimeErrorss((prev) => ({
                                      ...prev,
                                      [index]: "equalTime",
                                    }));
                                  } else {
                                    setCloseTimeErrorss((prev) => {
                                      const copy = { ...prev };
                                      delete copy[index];
                                      return copy;
                                    });
                                  }
                                }

                                setFieldValue(
                                  close,
                                  closeTime ? closeTime.format("HH:mm:ss") : ""
                                );
                                setFieldTouched(close, true, true);
                              }}
                              onClose={() => setFieldTouched(close, true, true)}
                              slotProps={{
                                textField: {
                                  placeholder: "Enter closing time...",
                                  id: "closeTime",
                                  variant: "outlined",
                                  helperText: getCloseTimeErrorsMessage(index)
                                    ? getCloseTimeErrorsMessage(index)
                                    : errorClose && touchedClose
                                    ? "Closing time is required"
                                    : !isMobile && " ",
                                  error:
                                    !!closeTimeErrorss[index] ||
                                    (errorClose && touchedClose),
                                },
                              }}
                              sx={{
                                "& .MuiOutlinedInput-input": {
                                  color:
                                    errorClose && touchedClose
                                      ? error
                                      : hour.close
                                      ? "inherit"
                                      : disabledText,
                                },
                                "& input::placeholder": {
                                  color:
                                    errorClose && touchedClose
                                      ? error
                                      : hour.close
                                      ? "inherit"
                                      : disabledText,
                                },
                              }}
                            />
                          </Grid>

                          <Grid
                            item
                            xs={2}
                            sm={1}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <IconButton
                              icon="cancel"
                              color="error"
                              size="large"
                              sx={{ marginBottom: "20px" }}
                              onClick={() => remove(index)}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            sm={1}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <IconButton
                              icon="copy"
                              color="primary"
                              size="large"
                              sx={{ marginBottom: "20px" }}
                              onClick={() => insert(index + 1, hour)}
                            />
                          </Grid>
                        </Grid>
                      </LocalizationProvider>
                    </div>
                  );
                })}
              <Button
                variant="outlined"
                size="small"
                type="button"
                icon="add"
                startIcon={addIcon}
                onClick={() =>
                  push({ weekOfMonth: "", dayOfWeek: "", open: "", close: "" })
                }
              >
                Add Hours
              </Button>
            </div>
          )}
        </FieldArray>

        {typeof errors.hours === "string" && (
          <FormHelperText error>{errors.hours}</FormHelperText>
        )}
      </CardContent>
    </Card>
  );
};

OpenTimeForm.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
};

export default OpenTimeForm;

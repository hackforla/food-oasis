import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import OpenTimeForm from "components/Admin/OpenTimeForm";
import { TabPanel } from "components/Admin/ui/TabPanel";
import Label from "../ui/Label";
import Textarea from "../ui/Textarea";
import { FormikErrors, FormikTouched } from "formik";

interface Hour {
  weekOfMonth: string | number;
  dayOfWeek: string;
  open: string;
  close: string;
}

interface BusinessHoursValues {
  confirmedHours: boolean;
  allowWalkins: boolean;
  hoursNotes: string;
  hours: Hour[];
}

interface BusinessHoursProps {
  tabPage: number;
  values: BusinessHoursValues;
  touched: FormikTouched<BusinessHoursValues>;
  errors: FormikErrors<BusinessHoursValues>;
  confirmationErrors?: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement
    >
  ) => void;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => void;
  setFieldTouched: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
}

export default function BusinessHours({
  tabPage,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
  setFieldTouched,
  confirmationErrors = {},
}: BusinessHoursProps) {
  return (
    <TabPanel value={tabPage} index={1}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography>Business hours for Food Seekers</Typography>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <FormControlLabel
              componentsProps={{
                typography: {
                  sx: {
                    color: confirmationErrors["confirmedHours"] ? "error.main" : "inherit",
                  }
                }
              }}
              control={
                <Checkbox
                  name="confirmedHours"
                  value={values.confirmedHours}
                  checked={values.confirmedHours}
                  sx={{ color: confirmationErrors["confirmedHours"] ? "error.main" : "inherit" }}
                  onChange={() =>
                    setFieldValue("confirmedHours", !values.confirmedHours)
                  }
                  onBlur={handleBlur}
                />
              }
              label="Confirm Hours"
            />
          </div>
          <OpenTimeForm
            values={values}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="allowWalkins"
                value={values.allowWalkins}
                checked={values.allowWalkins}
                onChange={() =>
                  setFieldValue("allowWalkins", !values.allowWalkins)
                }
                onBlur={handleBlur}
              />
            }
            label="Allow Walk-Ins"
          />
          <div>
            <Label
              id="hoursNotes"
              label="Notes about hours"
              tooltipTitle="Notes and caveats about hours"
            />
            <Textarea
              id="hoursNotes"
              name="hoursNotes"
              placeholder="Notes about hours"
              value={values.hoursNotes}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.hoursNotes ? errors.hoursNotes : ""}
              error={touched.hoursNotes && Boolean(errors.hoursNotes)}
            />
          </div>
        </Grid>
      </Grid>
    </TabPanel>
  );
}

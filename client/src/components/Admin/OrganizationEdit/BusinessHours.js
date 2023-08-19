import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import OpenTimeForm from "components/Admin/OpenTimeForm";
import { TabPanel } from "components/Admin/ui/TabPanel";
import Label from "../ui/Label";
import Textarea from "../ui/Textarea";

export default function BusinessHours({
  tabPage,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
  setFieldTouched,
}) {
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
              control={
                <Checkbox
                  margin="normal"
                  name="confirmedHours"
                  value={values.confirmedHours}
                  checked={values.confirmedHours}
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
            name="hours"                          
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
                margin="normal"
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
              variant="outlined"
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

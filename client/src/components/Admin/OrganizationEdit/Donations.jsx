import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Tooltip,
} from "@mui/material";
import { TabPanel } from "components/Admin/ui/TabPanel";
import Label from "../ui/Label";

export default function Donations({
  tabPage,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
}) {
  return (
    <TabPanel value={tabPage} index={4}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <div>
            <Label
              id="donationContactName"
              label="Donation Contact Name"
              tooltipTitle="Name of person(s) to contact for donations"
            />
            <TextField
              id="donationContactName"
              name="donationContactName"
              placeholder="Donation Contact Name"
              value={values.donationContactName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={
                touched.donationContactName ? errors.donationContactName : ""
              }
              error={
                touched.donationContactName &&
                Boolean(errors.donationContactName)
              }
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div>
            <Label
              id="donationContactPhone"
              label="Donation Phone"
              tooltipTitle="Phone for donations"
            />
            <TextField
              id="donationContactPhone"
              name="donationContactPhone"
              placeholder="Donation Phone"
              value={values.donationContactPhone}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={
                touched.donationContactPhone ? errors.donationContactPhone : ""
              }
              error={
                touched.donationContactPhone &&
                Boolean(errors.donationContactPhone)
              }
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div>
            <Label
              id="donationContactEmail"
              label="Donation Email"
              tooltipTitle="Email for donations"
            />
            <TextField
              id="donationContactEmail"
              name="donationContactEmail"
              placeholder="Donation Email"
              value={values.donationContactEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={
                touched.donationContactEmail ? errors.donationContactEmail : ""
              }
              error={
                touched.donationContactEmail &&
                Boolean(errors.donationContactEmail)
              }
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div>
            <Label
              id="donationSchedule"
              label="Donation Schedule"
              tooltipTitle="When can organization receive or pickup donations"
            />
            <TextField
              id="donationSchedule"
              name="donationSchedule"
              placeholder="Donation Schedule"
              value={values.donationSchedule}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={
                touched.donationSchedule ? errors.donationSchedule : ""
              }
              error={
                touched.donationSchedule && Boolean(errors.donationSchedule)
              }
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Tooltip title="Check if organization can pick up food from source">
            <FormControlLabel
              control={
                <Checkbox
                  margin="normal"
                  name="donationPickup"
                  label="Pick Up"
                  value={values.donationPickup}
                  checked={values.donationPickup}
                  onChange={() =>
                    setFieldValue("donationPickup", !values.donationPickup)
                  }
                  onBlur={handleBlur}
                />
              }
              label="Pick Up"
            />
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Tooltip title="Check if organization can accept frozen food">
            <FormControlLabel
              control={
                <Checkbox
                  margin="normal"
                  name="donationAcceptFrozen"
                  label="Frozen"
                  value={values.donationAcceptFrozen}
                  checked={values.donationAcceptFrozen}
                  onChange={() =>
                    setFieldValue(
                      "donationAcceptFrozen",
                      !values.donationAcceptFrozen
                    )
                  }
                  onBlur={handleBlur}
                />
              }
              label="Frozen"
            />
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Tooltip title="Check if organization can accept refrigerated food">
            <FormControlLabel
              control={
                <Checkbox
                  margin="normal"
                  name="donationAcceptRefrigerated"
                  label="Refrigerated"
                  value={values.donationAcceptRefrigerated}
                  checked={values.donationAcceptRefrigerated}
                  onChange={() =>
                    setFieldValue(
                      "donationAcceptRefrigerated",
                      !values.donationAcceptRefrigerated
                    )
                  }
                  onBlur={handleBlur}
                />
              }
              label="Refrigerated"
            />
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Tooltip title="Check if organization can accept perishables">
            <FormControlLabel
              control={
                <Checkbox
                  margin="normal"
                  name="donationAcceptPerishable"
                  label="Perishable"
                  value={values.donationAcceptPerishable}
                  checked={values.donationAcceptPerishable}
                  onChange={() =>
                    setFieldValue(
                      "donationAcceptPerishable",
                      !values.donationAcceptPerishable
                    )
                  }
                  onBlur={handleBlur}
                />
              }
              label="Perishable"
            />
          </Tooltip>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div>
            <Label
              id="donationDeliveryInstructions"
              label="Donation Delivery or Pickup Instructions"
              tooltipTitle="Delivery Instructions"
            />
            <TextField
              id="donationDeliveryInstructions"
              name="donationDeliveryInstructions"
              placeholder="Donation Delivery or Pickup Instructions"
              value={values.donationDeliveryInstructions}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={
                touched.donationDeliveryInstructions
                  ? errors.donationDeliveryInstructions
                  : ""
              }
              error={
                touched.donationDeliveryInstructions &&
                Boolean(errors.donationDeliveryInstructions)
              }
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div>
            <Label
              id="donationNotes"
              label="Donation Notes"
              tooltipTitle="Other donation notes"
            />
            <TextField
              id="donationNotes"
              name="donationNotes"
              placeholder="Donation Notes"
              value={values.donationNotes}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.donationNotes ? errors.donationNotes : ""}
              error={touched.donationNotes && Boolean(errors.donationNotes)}
            />
          </div>
        </Grid>
      </Grid>
    </TabPanel>
  );
}

import { Grid, TextField } from "@mui/material";
import { TabPanel } from "components/Admin/ui/TabPanel";
import Label from "../ui/Label";

export default function ContactDetails({
  tabPage,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
}) {
  return (
    <TabPanel value={tabPage} index={2}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <div>
            <Label
              id="website"
              label="Web Site"
              tooltipTitle="The organization's web address"
            />
            <TextField
              id="website"
              name="website"
              placeholder="Web Site"
              value={values.website}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.website ? errors.website : ""}
              error={touched.website && Boolean(errors.website)}
            />
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <div>
            <Label id="instagram" label="Instagram" />
            <TextField
              id="instagram"
              name="instagram"
              placeholder="Instagram"
              value={values.instagram}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.instagram ? errors.instagram : ""}
              error={touched.instagram && Boolean(errors.instagram)}
            />
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <div>
            <Label id="facebook" label="Facebook" />
            <TextField
              id="facebook"
              name="facebook"
              placeholder="Facebook"
              value={values.facebook}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.facebook ? errors.facebook : ""}
              error={touched.facebook && Boolean(errors.facebook)}
            />
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <div>
            <Label id="twitter" label="Twitter" />
            <TextField
              id="twitter"
              name="twitter"
              placeholder="Twitter"
              value={values.twitter}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.twitter ? errors.twitter : ""}
              error={touched.twitter && Boolean(errors.twitter)}
            />
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <div>
            <Label id="pinterest" label="Pinterest" />
            <TextField
              id="pinterest"
              name="pinterest"
              placeholder="Pinterest"
              value={values.pinterest}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.pinterest ? errors.pinterest : ""}
              error={touched.pinterest && Boolean(errors.pinterest)}
            />
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <div>
            <Label id="linkedin" label="LinkedIn" />
            <TextField
              id="linkedin"
              name="linkedin"
              placeholder="LinkedIn"
              value={values.linkedin}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.linkedin ? errors.linkedin : ""}
              error={touched.linkedin && Boolean(errors.linkedin)}
            />
          </div>
        </Grid>
      </Grid>
    </TabPanel>
  );
}

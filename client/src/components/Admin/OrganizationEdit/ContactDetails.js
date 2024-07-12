import { Grid, TextField } from "@mui/material";
import { TabPanel } from "components/Admin/ui/TabPanel";
import Label from "../ui/Label";
import { isValidUrl } from "../../../helpers/validatingURL";

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
              helperText={(touched.website ? errors.website : "") || ((isValidUrl(values.website) || (!values.website)) ? "" : "Please enter a valid URL")}
              error={(touched.website && Boolean(errors.website)) || (values.website && !isValidUrl(values.website))}
            />
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <div>
            <Label 
              id="instagram" 
              label="Instagram"
              tooltipTitle="This org’s full Instagram URL: https://instagram.com/…" 
            />
            <TextField
              id="instagram"
              name="instagram"
              placeholder="Instagram"
              value={values.instagram}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={(touched.instagram ? errors.instagram : "") || ((isValidUrl(values.instagram) || (!values.instagram)) ? "" : "Please enter a valid URL")}
              error={(touched.instagram && Boolean(errors.instagram)) || (values.instagram && !isValidUrl(values.instagram))}
            />
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <div>
            <Label 
              id="facebook" 
              label="Facebook" 
              tooltipTitle="This org’s full Facebook URL: https://facebook.com/…"
            />
            <TextField
              id="facebook"
              name="facebook"
              placeholder="Facebook"
              value={values.facebook}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={(touched.facebook ? errors.facebook : "") || ((isValidUrl(values.facebook) || (!values.facebook)) ? "" : "Please enter a valid URL")}
              error={(touched.facebook && Boolean(errors.facebook)) || (values.facebook && !isValidUrl(values.facebook))}
            />
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <div>
            <Label 
              id="twitter" 
              label="Twitter" 
              tooltipTitle="This org’s full Twitter URL: https://x.com/…"
            />
            <TextField
              id="twitter"
              name="twitter"
              placeholder="Twitter"
              value={values.twitter}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={(touched.twitter ? errors.twitter : "") || ((isValidUrl(values.twitter) || (!values.twitter)) ? "" : "Please enter a valid URL")}
              error={(touched.twitter && Boolean(errors.twitter)) || (values.twitter && !isValidUrl(values.twitter))}
            />
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <div>
            <Label 
              id="pinterest" 
              label="Pinterest" 
              tooltipTitle="This org’s full Pinterest URL: https://pinterest.com/…"
            />
            <TextField
              id="pinterest"
              name="pinterest"
              placeholder="Pinterest"
              value={values.pinterest}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={(touched.pinterest ? errors.pinterest : "") || ((isValidUrl(values.pinterest) || (!values.pinterest)) ? "" : "Please enter a valid URL")}
              error={(touched.pinterest && Boolean(errors.pinterest)) || (values.pinterest && !isValidUrl(values.pinterest))}
            />
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <div>
            <Label 
              id="linkedin" 
              label="LinkedIn" 
              tooltipTitle="This org’s full LinkedIn URL: https://linkedin.com/…"
            />
            <TextField
              id="linkedin"
              name="linkedin"
              placeholder="LinkedIn"
              value={values.linkedin}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={(touched.linkedin ? errors.linkedin : "") || ((isValidUrl(values.linkedin) || (!values.linkedin)) ? "" : "Please enter a valid URL")}
              error={(touched.linkedin && Boolean(errors.linkedin)) || (values.linkedin && !isValidUrl(values.linkedin))}
            />
          </div>
        </Grid>
      </Grid>
    </TabPanel>
  );
}
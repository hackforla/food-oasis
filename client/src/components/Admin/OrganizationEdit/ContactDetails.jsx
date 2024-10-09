import { Grid } from "@mui/material";
import { TabPanel } from "components/Admin/ui/TabPanel";
import { InputAdornment, TextField } from "@mui/material";
import Label from "../ui/Label";

const CustomTextFieldComponent = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  touched,
  errors,
  startAdornment,
}) => (
  <TextField
    id={id}
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: "4px",
        backgroundColor: "white",
        paddingLeft: "0",
        "& fieldset": {
          borderColor: "grey",
        },
        "& input::placeholder": {
          color: "#B0BEC5",
          opacity: 1,
        },
      },
      "& .MuiInputAdornment-root": {
        backgroundColor: "#F4F6F8",
        padding: "22px 8px 22px 8px",
        borderRight: "1px solid grey",
        borderRadius: "4px 0 0 4px",
        color: "#B0BEC5",
        margin: "-20px 0",
      },
    }}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    helperText={touched ? errors : ""}
    error={Boolean(touched && errors)}
    InputProps={{
      startAdornment: startAdornment && (
        <InputAdornment position="start">{startAdornment}</InputAdornment>
      ),
    }}
  />
);

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
            <Label
              id="instagram"
              label="Instagram"
              tooltipTitle="Enter your Instagram username"
              href="https://instagram.com/"
              handle={values.instagram}
            />
            <CustomTextFieldComponent
              id="instagram"
              name="instagram"
              placeholder="Instagram username"
              value={values.instagram}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.instagram}
              errors={errors.instagram}
              startAdornment="https://instagram.com/"
            />
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <div>
            <Label
              id="facebook"
              label="Facebook"
              tooltipTitle="Enter your Facebook username"
              href="https://facebook.com/"
              handle={values.facebook}
            />
            <CustomTextFieldComponent
              id="facebook"
              name="facebook"
              placeholder="Facebook username"
              value={values.facebook}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.facebook}
              errors={errors.facebook}
              startAdornment="https://facebook.com/"
            />
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <div>
            <Label
              id="twitter-label"
              label="Twitter"
              tooltipTitle="Enter your Twitter username"
              href="https://twitter.com/"
              handle={values.twitter}
            />
            <CustomTextFieldComponent
              id="twitter"
              name="twitter"
              placeholder="Twitter username"
              value={values.twitter}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.twitter}
              errors={errors.twitter}
              startAdornment="https://twitter.com/"
            />
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <div>
            <Label
              id="pinterest"
              label="Pinterest"
              href="https://pinterest.com/"
              handle={values.pinterest}
              tooltipTitle="Enter your Pinterest username"
            />
            <CustomTextFieldComponent
              id="pinterest"
              name="pinterest"
              placeholder="Pinterest username"
              value={values.pinterest}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.pinterest}
              errors={errors.pinterest}
              startAdornment="https://pinterest.com/"
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

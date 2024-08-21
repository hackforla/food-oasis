import { Grid } from "@mui/material";
import { TabPanel } from "components/Admin/ui/TabPanel";
import { InputAdornment, TextField } from "@mui/material";
import Label from "../ui/Label";
import { styled } from "@mui/system";

export default function ContactDetails({
  tabPage,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
}) {
  const CustomTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      borderRadius: "4px",
      backgroundColor: "white",
      paddingLeft: "0",
      "& fieldset": {
        borderColor: "grey",
      },
      "&:hover fieldset": {},
      "&.Mui-focused fieldset": {},
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
  });

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
    <CustomTextField
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      helperText={touched[name] ? errors[name] : ""}
      error={touched[name] && Boolean(errors[name])}
      InputProps={{
        startAdornment: startAdornment && (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ),
      }}
    />
  );
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
              placeholder="Twitter handle"
              value={values.twitter}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched}
              errors={errors}
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
              tooltipTitle="URL must start with 'https://pinterest.com/'"
            />
            <CustomTextFieldComponent
              id="pinterest"
              name="pinterest"
              placeholder="Pinterest username"
              value={values.pinterest}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched}
              error={touched.pinterest && Boolean(errors.pinterest)}
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

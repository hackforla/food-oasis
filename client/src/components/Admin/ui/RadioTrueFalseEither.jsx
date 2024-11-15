import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { bodyText } from "theme/palette";

const RadioTrueFalseEither = (props) => {
  const { label, name, value, onChange } = props;
  return (
    <FormControl
      component="fieldset"
      sx={{
        border: "1px solid gray",
        padding: "0.5em",
        width: "100%",
        paddingLeft: "16px",
      }}
    >
      <FormLabel
        component="legend"
        sx={{ fontWeight: "bold", color: bodyText }}
      >
        {label}
      </FormLabel>
      <RadioGroup
        defaultValue="either"
        aria-label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        <FormControlLabel
          value="true"
          control={<Radio />}
          label={<Typography sx={{ fontStyle: "normal" }}>Yes</Typography>}
        />
        <FormControlLabel
          value="false"
          control={<Radio />}
          label={<Typography sx={{ fontStyle: "normal" }}>No</Typography>}
        />
        <FormControlLabel
          value="either"
          control={<Radio />}
          label={<Typography sx={{ fontStyle: "normal" }}>Either</Typography>}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioTrueFalseEither;

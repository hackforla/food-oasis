import { TextField } from "@mui/material";

const Textarea = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  helperText,
  error,
  rows,
  props
}) => {
  return (
    <TextField
      variant="outlined"
      flex={2}
      id={id}
      name={name}
      placeholder={placeholder}
      multiline
      sx={{
        "& .MuiInputBase-root": {
          "& textarea": {
            padding: "11px 16px",
          },
          height: "auto",
          padding: "0",
        },
      }}
      rows={rows || "auto"}
      minRows={2}
      maxRows={12}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      helperText={helperText}
      error={error}
      {...props}
    />
  );
};

export default Textarea;

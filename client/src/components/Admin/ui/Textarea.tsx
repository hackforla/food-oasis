import { TextField } from "@mui/material";
import React from "react";

interface TextareaProps {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  helperText?: string;
  error?: boolean;
  rows?: number | null;
  margin?: string;
  fullWidth?: boolean;
  type?: string;
  size?: string;
  props?: any;
}

const Textarea = (props: TextareaProps) => {
  const {
    id,
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    helperText,
    error,
    rows = null,
    margin,
    fullWidth,
    type,
    size,
    props: otherProps,
  } = props;
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
      minRows={rows || 2}
      maxRows={rows || 12}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      helperText={helperText}
      error={error}
      margin={margin}
      fullWidth={fullWidth}
      type={type}
      size={size}
      {...otherProps}
    />
  );
};

export default Textarea;

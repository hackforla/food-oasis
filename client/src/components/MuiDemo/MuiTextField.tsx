import { Box, MenuItem, Stack, TextField, Typography } from "@mui/material";
import type { ChangeEvent } from "react";
import Label from "components/Admin/ui/Label";
import { useState } from "react";

const variants = ["outlined", "filled", "standard"] as const;
type TextFieldVariant = (typeof variants)[number];

const isTextFieldVariant = (value: string): value is TextFieldVariant => {
  return variants.includes(value as TextFieldVariant);
};

function MuiForm() {
  const [variant, setVariant] = useState<TextFieldVariant>("outlined");

  const handleVariantChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (isTextFieldVariant(value)) {
      setVariant(value);
    }
  };

  return (
    <>
      <Box component="form">
        <Stack spacing={2}>
          <TextField
            id="select-variant"
            select
            label="Select a Variant"
            defaultValue="outlined"
            value={variant}
            onChange={handleVariantChange}
            sx={{ maxWidth: "15rem", margin: "0 1rem 0 auto" }}
          >
            {variants.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Typography variant="h6" component="h3">
            Basic Examples
          </Typography>
          <TextField label="Select Variant" />
          <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue="Hello World"
            variant={variant}
          />
          <TextField
            disabled
            id="outlined-disabled"
            label="Disabled"
            defaultValue="Hello World"
            variant={variant}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant={variant}
          />
          <TextField
            id="outlined-read-only-input"
            label="Read Only"
            defaultValue="Hello World"
            InputProps={{
              readOnly: true,
            }}
            variant={variant}
          />
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant={variant}
          />
          <TextField id="outlined-search" label="Search field" type="search" />
          <TextField
            id="outlined-helperText"
            label="Helper text"
            defaultValue="Default Value"
            helperText="Some important text"
            variant={variant}
          />
          <TextField
            error
            id="outlined-error"
            label="Error"
            defaultValue="Hello World"
            variant={variant}
          />
          <TextField
            error
            id="outlined-error-helper-text"
            label="Error"
            defaultValue="Hello World"
            helperText="Incorrect entry."
            variant={variant}
          />
          <Typography variant="h6" component="h3">
            Validation Examples
          </Typography>
          <TextField
            error
            id="filled-error"
            label="Error"
            defaultValue="Hello World"
            variant={variant}
          />
          <TextField
            error
            id="filled-error-helper-text"
            label="Error"
            defaultValue="Hello World"
            helperText="Incorrect entry."
            variant={variant}
          />
          <div>
            <Label id="label" label="Hello World" tooltipTitle="Hello World" />
            <TextField id="label" name="label" placeholder="Hello World" />
          </div>
        </Stack>
      </Box>
    </>
  );
}

export default MuiForm;

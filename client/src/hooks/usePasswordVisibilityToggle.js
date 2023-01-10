import React, { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const usePasswordVisibilityToggle = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return {
    passwordVisibility,
    togglePasswordVisibility,
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={togglePasswordVisibility}
            edge="end"
          >
            {passwordVisibility ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      ),
    },
  };
};

export default usePasswordVisibilityToggle;

import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { TextFieldStyled } from "./styled";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const PasswordTextField = ({
  fieldName,
  value,
  onChange,
  error,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextFieldStyled
      type={showPassword ? "text" : "password"}
      inputProps={{
        "aria-label": fieldName,
        autoComplete: "on",
      }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      variant="outlined"
      placeholder="********"
      error={error}
      helperText={helperText}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockOutlinedIcon color="violet" />
          </InputAdornment>
        ),
        endAdornment: (
          <IconButton
            onClick={() => setShowPassword((prevState) => !prevState)}
            aria-label={`Toggle ${fieldName} visibility`}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        ),
        "aria-describedby": error ? `${fieldName}-error` : undefined,
      }}
    />
  );
};

export default PasswordTextField;

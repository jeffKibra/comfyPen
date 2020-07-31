import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Box } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import PropTypes from "prop-types";

export default function PasswordInput(props) {
  const { name, register, errors, registerObject } = props;
  const [visible, setVisible] = useState(false);

  const showPassword = () => {
    setVisible(!visible);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        p={1}
        marginBottom={2}
      >
        <TextField
          label={name}
          name={name}
          type={visible ? "text" : "password"}
          variant="outlined"
          size="small"
          inputRef={register({
            ...registerObject,
          })}
          error={!!errors[name]?.message}
          helperText={errors[name]?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={showPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {visible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>
  );
}

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

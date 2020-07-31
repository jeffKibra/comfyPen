import React from "react";
import { Typography, Button, Box } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PasswordInput from "../component/passwordInput";

const KeyFormComponent = (props) => {
  const { register, errors, watch } = props;

  return (
    <>
      <Box p={1}>
        <Typography variant="h6">Set a pin!</Typography>
      </Box>

      <PasswordInput
        name="pin"
        register={register}
        registerObject={{
          required: {
            value: true,
            message: "please provide a pin",
          },
          minLength: {
            value: 4,
            message: "your pin must be atleast 4 characters long",
          },
        }}
        errors={errors}
      />

      <PasswordInput
        name="confirmPin"
        register={register}
        registerObject={{
          validate: (value) => value === watch("pin") || "pins do not match",
          required: {
            value: true,
            message: "please confirm your pin",
          },
        }}
        errors={errors}
      />

      <Box p={1}>
        <Button
          endIcon={<FontAwesomeIcon icon="save" />}
          component="button"
          type="submit"
        >
          save
        </Button>
      </Box>
    </>
  );
};

export default KeyFormComponent;

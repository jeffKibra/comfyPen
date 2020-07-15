import React from "react";
import PinForm from "./pinForm";
import $ from "jquery";
import LoginHOC from "./loginHOC";

function PinLogin({ access, setKey, setMsg }) {
  const onFormSubmit = (data) => {
    access(data)
      .then((value) => {
        if (value === 0) throw new Error("Invalin pin");
        return setKey(data);
      })
      .catch((err) => {
        setMsg({ msg: err.message });
        $("#snackBarTrigger").trigger("click");
        console.log(err.message);
      });
  };

  return <PinForm onFormSubmit={onFormSubmit} />;
}

export default LoginHOC(PinLogin);

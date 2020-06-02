function validateFormInput(name, value) {
  let fail = "";
  if (name === "firstname") {
    fail = validateFirstname(value);
  } else if (name === "surname") {
    fail = validateSurname(value);
  } else if (name === "subject") {
    fail = validateSubject(value);
  } else if (name === "entry") {
    fail = validateEntry(value);
  } else if (name === "username") {
    fail = validateUsername(value);
  } else if (name === "email") {
    fail = validateEmail(value);
  } else if (name === "password") {
    fail = validatePassword(value);
  } else if (name === "journalName") {
    fail = validateJournalName(value);
  } else if (name === "journalDescription") {
    fail = validateJournalDescription(value);
  } else {
    fail = "invalid entry";
  }
  return fail;
}

function validateFirstname(field) {
  if (field === "") return "No name was entered.\n";
  return "";
}

function validateSurname(field) {
  if (field === "") return "No Surname was entered.\n";
  return "";
}

function validateUsername(field) {
  if (field === "") return "No username was entered.\n";
  return "";
}

function validatePassword(field) {
  if (field === "") return "No password was entered.\n";
  return "";
}

function validatePasswordConfirm(field1, field2) {
  if (field1 === "" || field2 === "") return "No password was entered.\n";
  if (field1 !== field2) return "passwords do not match";

  return "";
}
//!(field.indexOf(".") > 0 && field.indexOf("@") > 0) ||/[^a-zA-Z0-9.@_-]/
function validateEmail(field) {
  const emailTest = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(field);
  if (field === "") return "No Email was entered.\n";
  else if (!emailTest) return "The Email address is invalid.\n";
  return "";
}

function validateSubject(field) {
  if (field === "") return "please add a subject.\n";
  return "";
}

function validateEntry(field) {
  if (field === "") return "Empty fields cannot be saved.\n";
  return "";
}

function validateJournalName(field) {
  if (field === "") return "please write a journal name.\n";
  return "";
}

function validateJournalDescription(field) {
  if (field === "") return "please write a journal description.\n";
  return "";
}

function validateCustom(field) {
  if (field === "") return "please write something in this field.\n";
  return "";
}

export {
  validateFormInput,
  validateFirstname,
  validateSurname,
  validateUsername,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validateSubject,
  validateEntry,
  validateCustom
};

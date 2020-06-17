const initialState = {
  msg: "",
  securityKey: false,
  storageKey: false,
  loading: false,
  current: 0,
  validated: false,
  status: false,
  finish: false,
  email: "",
  steps: [
    { title: "Email", content: "Confirm Email" },
    { title: "Password", content: "Type in your Password" },
  ],
};

const customReducer = (state = initialState, action) => {
  //console.log(state);
  let msg, loading, current, email;
  switch (action.type) {
    case "CHECK_EMAIL":
      console.log(action);
      email = action.email;
      loading = false;
      msg = action.msg;
      return {
        ...state,
        email,
        loading,
        msg,
      };
    case "LOADING":
      loading = action.loading;
      return {
        ...state,
        loading,
      };
    case "FINISH_LOADING":
      msg = action.msg;
      loading = action.loading;
      return {
        ...state,
        msg,
        loading,
      };
    case "SET_KEY":
      let securityKey;
      if (!!action.data.pin) {
        securityKey = true;
      } else {
        securityKey = false;
      }
      return { ...state, securityKey };
    case "NEXT":
      current = state.current + 1;
      return { ...state, current };
    case "PREV":
      current = state.current - 1;
      return { ...state, current };
    case "CHECK_KEY":
      const storageKey = action.data.storageKey;
      return { ...state, storageKey };
    case "SET_MSG":
      msg = action.data.msg;
      return { ...state, msg };
    default:
      return state;
  }
};

export default customReducer;

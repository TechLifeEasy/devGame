const init = {
    email: "",
    name: "",
    password: "",
    otp: "",
  };
  
  function reducer(state, action) {

    console.log(action)

    switch (action.type) {
      case "email":
        return { ...state, email: action.data };
      case "name":
        return { ...state, name: action.data };
      case "password":
        return { ...state, password: action.data };
      case "otp":
        return { ...state, otp: action.data };
      default:
        throw new Error("Invalid");
    }
  }


export {init,reducer};
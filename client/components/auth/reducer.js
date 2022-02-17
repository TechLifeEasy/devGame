const init = {
    email: "",
    name: "",
    password: "",
    otp: "",
    github:"",
    bio:"",
    image:""
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
      case "bio":
        return { ...state, bio: action.data };
      case "github":
        return { ...state, github: action.data };
      case "image":
        return { ...state, image: action.data };
      default:
        throw new Error("Invalid");
    }
  }


export {init,reducer};
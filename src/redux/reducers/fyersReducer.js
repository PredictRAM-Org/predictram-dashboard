const initState = {
  fyerslogin: false,
  fyers_refresh_token: null,
  fyers_access_token: null,
};
const fyersReducer = (state = initState, action) => {
  switch (action.type) {
    case "FYERS_LOGIN_AUTHTOKEN":
      const { refresh_token, access_token } = action.payload;
      console.log(refresh_token, access_token);
      return {
        ...initState,
        fyerslogin: true,
        fyers_refresh_token: refresh_token,
        fyers_access_token: access_token,
      };
    case "FYERS_LOGIN_REFRESH_TOKEN":
      return {
        ...state,
        fyerslogin: true,
        fyers_access_token: action.payload.access_token,
      };
    case "FYERS_LOGOUT":
      return {
        ...state,
        fyerslogin: false,
        fyers_refresh_token: null,
        fyers_access_token: null,
      };
    default:
      return { ...state };
  }
};
export default fyersReducer;

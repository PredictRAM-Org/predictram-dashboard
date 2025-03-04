const initState = {
  check: false,
  authenticated: false,
  name: "",
  username: "",
  email: "",
  image: "",
  role: "",
  secretToken: "",
  active: false,
  admin: false,
  creator: false,
  premiumUser: false,
  expiry: undefined,
  triedFreePremium: false,
  profilecomplete: false,
  professional: false,
  accessToRate: false,
  isBetaUser: false,
  accessToUser: true,
};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      const { premiumUser, expiry, triedFreePremium } = action.payload.payments;

      const {
        id,
        name,
        userid,
        email,
        admin,
        image,
        secret_token,
        active,
        creator,
        profilecomplete,
        professional,
        accessToRate,
        role,
        isBetaUser,
        accessToUser,
      } = action.payload;

      return {
        ...state,
        authenticated: true,
        check: true,
        id,
        name,
        username: userid,
        email,
        admin,
        creator,
        image,
        active,
        premiumUser,
        expiry,
        secretToken: secret_token,
        triedFreePremium,
        profilecomplete,
        professional,
        accessToRate,
        role,
        isBetaUser,
        accessToUser,
      };
    case "LOGOUT":
      return {
        ...initState,
        check: true,
      };
    case "SET_USER_CHECK":
      return { ...state, check: true };
    default:
      return { ...state };
  }
};
export default userReducer;

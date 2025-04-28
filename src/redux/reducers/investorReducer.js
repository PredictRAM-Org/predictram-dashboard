const initState = {
  check: false,
  authenticated: false,
  firstName: "",
  lastName: "",
  image: "",
  email: "",
  secretToken: "",
  mobileNumber: "",
  uniqueId: "",
  investorVAR: 0,
  investorIdealRisk: 0,
  premiumUser: false,
  expiry: undefined,
  triedFreePremium: false,
  profileCompleted: false,
};
const investorReducer = (state = initState, action) => {
  switch (action.type) {
    case "INVESTOR_SIGNUP":
      const { premiumUser, expiry, triedFreePremium } = action.payload.payments;

      const {
        _id,
        firstName,
        lastName,
        email,
        image,
        mobileNumber,
        profileCompleted,
        secretToken,
        uniqueId,
        model_credit,
      } = action.payload;

      return {
        ...state,
        authenticated: true,
        check: true,
        _id,
        firstName,
        lastName,
        uniqueId,
        image,
        email,
        mobileNumber,
        profileCompleted,
        premiumUser,
        secretToken,
        expiry,
        triedFreePremium,
        model_credit,
      };
    case "INVESTOR_AUTHENTICATED":
      return {
        authenticated: true,
      };
    case "INVESTOR_RISKS_UPDATED":
      return {
        ...state,
        investorVAR: action.payload.investorVAR,
        investorIdealRisk: action.payload.investorIdealRisk,
      };
    case "INVESTOR_SIGNOUT":
      return {
        ...initState,
        check: true,
      };
    default:
      return { ...state };
  }
};
export default investorReducer;

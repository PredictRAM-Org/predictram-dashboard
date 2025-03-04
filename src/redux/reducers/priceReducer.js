const priceReducer = (state = [], action) => {
  switch (action.type) {
    case "SETPRICE":
      return (state = action.payload);
    case "SETPORTFOLIO":
      return (state = action.payload);
    default:
      return state;
  }
};
export default priceReducer;

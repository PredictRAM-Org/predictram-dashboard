const initState = {
  events: [],
  event: false,
  loading: true,
};
const eventReducer = (state = initState, action) => {
  switch (action.type) {
    case "SETEVENTS":
      return {
        ...state,
        events: action.payload,
      };
    case "SETEVENT":
      return {
        ...state,
        event: action.payload,
        loading: false,
      };
    case "SETEVENTLOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return { ...state };
  }
};
export default eventReducer;

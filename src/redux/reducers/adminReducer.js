const initState = {
  events: [],
  loading: true,
  users: [],
};
const adminReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_ADMIN_EVENTS":
      return {
        ...state,
        events: action.payload,
      };
    case "SET_ADMIN_USERS":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case "SET_ADMIN_EVENT_LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return { ...state };
  }
};
export default adminReducer;

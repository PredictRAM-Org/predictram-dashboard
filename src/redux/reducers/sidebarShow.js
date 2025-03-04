const initialState = {
  sidebarShow: true,
};

const sidebarShow = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "sidebar":
      return { ...state, ...rest };
    default:
      return state;
  }
};
export default sidebarShow;

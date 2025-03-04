const initialState = {
  investorSidebarShow: false,
};

const investorSidebarShow = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "investorSidebar":
      return { ...state, ...rest };
    default:
      return state;
  }
};
export default investorSidebarShow;

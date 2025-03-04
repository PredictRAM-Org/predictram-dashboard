import userReducer from "./userReducer";
import sidebarShow from "./sidebarShow";
import eventReducer from "./eventReducer";
import priceReducer from "./priceReducer";
import adminReducer from "./adminReducer";
import investorReducer from "./investorReducer";
import investorSidebarShow from "./investorSidebarShow";
import { combineReducers } from "redux";

const allReducer = combineReducers({
  user: userReducer,
  sidebarShow: sidebarShow,
  event: eventReducer,
  price: priceReducer,
  admin: adminReducer,
  investor: investorReducer,
  investorSidebarShow: investorSidebarShow,
});
export default allReducer;

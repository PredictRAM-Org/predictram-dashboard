import axios from "axios";
import { toast } from "react-toastify";
export const deleteEvnet = (id) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "/api/admin/deleteevent",
      { id },
      {
        withCredentials: true,
      }
    );
    dispatch(getevents());
    toast.success(data);
  } catch (error) {
    toast.error(error.response && error.response.data);
  }
};
export const getevents = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "/api/admin/getevents",
      { id: "61e140ed306edd2e65d45d8e" },
      {
        withCredentials: true,
      }
    );
    dispatch({ type: "SET_ADMIN_EVENTS", payload: data });
  } catch (error) {
    toast.error(error.response && error.response.data);
  }
};
export const getusers = () => async (dispatch) => {
  try {
    dispatch({ type: "SET_ADMIN_EVENT_LOADING" });
    const { data } = await axios.get("/api/admin/getusers", {
      withCredentials: true,
    });
    dispatch({ type: "SET_ADMIN_USERS", payload: data });
  } catch (error) {
    toast.error(error.response && error.response.data);
  }
};
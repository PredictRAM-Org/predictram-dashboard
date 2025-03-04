import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
export const getuser = () => async (dispatch) => {
  try {
    const sid = Cookies.get("connect.sid");
    if (sid) {
      const { data } = await axios.get("/api/users/getuser", {
        withCredentials: true,
      });
      dispatch({ type: "LOGIN", payload: data });
    } else dispatch({ type: "SET_USER_CHECK" });
  } catch (err) {
    dispatch({ type: "SET_USER_CHECK" });
  }
};
export const getblog = (blog) => async (dispatch) => {
  try {
    if (blog) {
      const { data } = await axios.post(
        "/api/users/getresearchpapaer",
        { id: blog },
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "SETSINGLEBLOG", payload: data });
    } else {
      const { data } = await axios.post("/api/users/getblog", {
        withCredentials: true,
      });
      dispatch({ type: "SETBLOG", payload: data });
    }
  } catch (err) {
    console.log(err.response);
    toast.error(err.message);
  }
};
export const getprofile = (id) => async (dispatch) => {
  try {
    if (id) {
      const { data } = await axios.post(
        "/api/users/getprofile",
        { id },
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "SETPROFILE", payload: data });
    } else {
      const { data } = await axios.post("/api/users/getprofile", {
        withCredentials: true,
      });
      dispatch({ type: "SETPROFILE", payload: data });
    }
  } catch {}
};
export const getEvents = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/users/getevents");
    dispatch({ type: "SETEVENTS", payload: data });
  } catch (error) {
    console.log("error.message");
    toast.error("Unable to get data");
  }
};
export const getEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: "SETEVENTLOADING" });
    const { data } = await axios.post(
      "/api/users/getevent",
      { id },
      { withCredentials: true }
    );
    const enddate = new Date(data[0].enddate);
    const date = new Date();
    data[0]["ended"] = enddate < date;
    dispatch({ type: "SETEVENT", payload: data[0] });
  } catch {
    toast.error("Unable to get data");
  }
};
export const getPrice = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/users/getprice");
    dispatch({ type: "SETPRICE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

// setting value at risk
export const getVAR = () => async (dispatch) => {
  try {
    const userPortfolioStock = await axios.get("/api/users/getportfoliostock");
    dispatch({ type: "SETPORTFOLIO", payload: userPortfolioStock.data });
  } catch (e) {
    return toast.error(e);
  }
};

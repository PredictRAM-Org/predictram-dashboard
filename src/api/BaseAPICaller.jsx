import axios from "axios";
import { toast } from "react-toastify";

export const apiPost = async (setLoading, url, body, headers = {}) => {
  let data = {};
  try {
    setLoading(true);
    await axios
      .post(url, body, {
        headers: {
          ...headers,
          "X-Frame-Options": "SAMEORIGIN",
          "X-Content-Type-Options": "nosniff",
        },
      })
      .then((res) => {
        toast.success(res?.data?.message);
        data = res.data;
        if (!!data) {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  } catch (err) {
    setLoading(false);
    console.log(err);
  }
  return data;
};

export const apiPosttoGet = async (setLoading, url, body, headers = {}) => {
  let data = {};
  try {
    setLoading(true);
    await axios
      .post(url, body, {
        headers: {
          ...headers,
          "X-Frame-Options": "SAMEORIGIN",
          "X-Content-Type-Options": "nosniff",
        },
      })
      .then((res) => {
        data = res?.data;
        if (!!data) {
          setLoading(false);
        }
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  } catch (err) {
    setLoading(false);
    console.log(err);
  }
  return data;
};

export const apiPut = async (setLoading, url, body, headers = {}) => {
  let data = {};
  try {
    setLoading(true);
    await axios
      .put(url, body, {
        headers: {
          ...headers,
          "X-Frame-Options": "SAMEORIGIN",
          "X-Content-Type-Options": "nosniff",
        },
      })
      .then((res) => {
        toast.success(res?.data?.message);
        data = res.data;
        if (!!data) {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  } catch (err) {
    console.log(err);
  }
  return data;
};

export const apiGet = async (setLoading, url, headers = {}) => {
  let data = {};
  try {
    setLoading(true);
    await axios
      .get(url, {
        headers: {
          ...headers,
          "X-Frame-Options": "SAMEORIGIN",
          "X-Content-Type-Options": "nosniff",
        },
      })
      .then((res) => {
        data = res.data;
        if (!!data) {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  } catch (err) {
    setLoading(false);
    console.log(err);
  }
  return data;
};

export const apiGetByParams = async (setLoading, url, params, headers = {}) => {
  let data = {};
  try {
    setLoading(true);
    await axios
      .get(url, {
        headers: {
          ...headers,
          "X-Frame-Options": "SAMEORIGIN",
          "X-Content-Type-Options": "nosniff",
        },
        params,
      })
      .then((res) => {
        data = res?.data;
        if (!!data) {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message ?? err);
      });
  } catch (err) {
    setLoading(false);
    toast.error(err);
  }
  return data;
};

export const apiDelete = async (setLoading, url, params, headers = {}) => {
  let data = {};
  try {
    setLoading(true);
    await axios
      .delete(url, {
        headers: {
          ...headers,
          "X-Frame-Options": "SAMEORIGIN",
          "X-Content-Type-Options": "nosniff",
        },
        params,
      })
      .then((res) => {
        toast.success(res?.data?.message);
        data = res.data;
        if (!!data) {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  } catch (err) {
    setLoading(false);
    console.log(err);
  }
  return data;
};

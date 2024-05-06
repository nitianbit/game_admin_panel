import { STORAGE_KEYS, getValue } from "../services/Storage";
const token = getValue(STORAGE_KEYS.TOKEN);
import apiHandler from "../services/api/apiHandler";
import { API_METHODS } from "../services/api/constants";

export const doGET = async function (url) {
  try {
    const reqBody = {
      reqParam: {}, method: "GET", endPoint: url,
      token
    };
    // const response = await tokenUtil?.callAPI(reqBody);
    const response = await apiHandler(url, API_METHODS.GET)
    return response;
    // if (response?.status === 200) {

    // } else if (response?.status === 401) {
    //   localStorage.clear();
    //   window.location = "/";
    // }
    // throw new Error(response?.data);
  } catch (err) {
    throw new Error(err?.message);
  }
};

export const doPOST = async function (url, data) {
  try {
    // const reqBody = {
    //   reqParam: data, method: "POST", endPoint: url,
    //   token
    // };
    // const response = await tokenUtil?.callAPI(reqBody);
    const response = await apiHandler(url, API_METHODS.POST, data)
    // if (response?.status === 200) {
    return response;
    // } 
    throw new Error(response?.data);
  } catch (err) {
    throw new Error(err?.message);
  }
};

export const doDELETE = async function (url) {
  try {
    // const response = await tokenUtil?.callAPI({
    //   reqParam: data, method: "DELETE", endPoint: url,
    //   token
    // });
    const response = await apiHandler(url, API_METHODS.DELETE)
    return response;
    // if (response?.status === 200) {
    // } else if (response?.status === 401) {
    //   localStorage.clear();
    //   window.location = "/";
    // }
    // throw new Error(response?.data);
  } catch (err) {
    throw new Error(err?.message);
  }
};

export const doPUT = async function (url, data) {
  try {
    // const response = await tokenUtil?.callAPI({
    //   reqParam: data, method: "PUT", endPoint: url,
    //   token
    // });
    const response = await apiHandler(url, API_METHODS.PUT, data)
    return response;
    // if (response?.status === 200) {
    // } else if (response?.status === 401) {
    //   localStorage.clear();
    //   window.location = "/";
    // }
    // throw new Error(response?.data);
  } catch (err) {
    throw new Error(err?.message);
  }
}



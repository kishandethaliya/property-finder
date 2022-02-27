import Axios from "axios";
import get from "lodash/get";
import { MAP_API_KEY } from "../../constants";

const REST_URL_SERVER = "http://localhost:4000";

export const getAddressFromAPI = (searchStr) => {
  const API_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchStr}.json?types=address&limit=10&access_token=${MAP_API_KEY}`;
  return async () => {
    return await Axios({ method: "get", url: API_URL })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log({ map_api_error: get(error, "response.data") });
        return error;
      });
  };
};

export const addPropertyData = (data) => {
  const url = "/api/add-property";
  const API_URL = `${REST_URL_SERVER}${url}`;
  return async () => {
    return await Axios({
      method: "post",
      url: API_URL,
      data,
    })
      .then((response) => response)
      .catch((error) => {
        console.log({ api_error: get(error, "response.data") });
      });
  };
};

export const getListOfProperties = () => {
  const url = "/api/get-properties";
  const API_URL = `${REST_URL_SERVER}${url}`;
  return async () => {
    return await Axios({ method: "get", url: API_URL })
      .then((response) => response)
      .catch((error) => {
        console.log({ api_error: get(error, "response.data") });
      });
  };
};

export const getListOfPropertiesFromSearchStr = (data) => {
  const url = "/api/get-list-by-search";
  const API_URL = `${REST_URL_SERVER}${url}`;
  return async () => {
    return await Axios({
      method: "post",
      url: API_URL,
      data,
    })
      .then((response) => response)
      .catch((error) => {
        console.log({ api_error: get(error, "response.data") });
      });
  };
};

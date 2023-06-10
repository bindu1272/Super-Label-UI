import axios from "axios";
import { notification } from "antd";
import get from "lodash/get";
import head from "lodash/head";
import * as TYPES from '../constants/actionTypes';
import * as APIS from '../constants/apiEndpoints';

const configureAxios = () =>
  axios.create({
    baseURL: APIS.BASE_URL,
    // "https://qy869wi5vc.execute-api.ap-south-1.amazonaws.com/dev/api/v1/",
    // baseURL: "http://localhost:9300/api/v1/",
    timeout: 25000
  });

export const axiosInstance = configureAxios();

axiosInstance.interceptors.request.use((config) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data.data;
  },
  (err) => {
    if (!err.response) {
      // notification.error({
      //   message: 'Something Went Wrong',
      //   description: 'Please Check Your Internet Connection',
      // });
    } else {
      import("./../redux/store/store").then((persistStore) => {
        const { store } = persistStore.default;
        const state = store.getState();

        console.log("Error>>>", err);
        if (err.response.status === 401 && !state.auth.isLoggedIn) {
          window.location.href = window.location.origin + "/";
          return;
        } else if (err.response.status === 401 && state.auth.isLoggedIn) {
          store.dispatch({ type: TYPES.LOGOUT });
          return;
        }
        else if (err.response.status === 400) {
          notification.error({
            message: get(err, "response.data.message", "Something Went Wrong"),
          });
        } else if (err.response.status === 422) {
          notification.error({
            message: get(err, "response.data.message", "Something Went Wrong"),
          });
        } else {
          let messages = get(err, "response.data.message");
          messages = get(head(messages), "messages");

          notification.error({
            message: get(head(messages), "message", "Something Went Wrong"),
          });
        }
      });
    }
    return Promise.reject(get(err, "response.data"));
  }
);

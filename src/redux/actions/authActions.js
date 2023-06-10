import { get } from "lodash";
import * as TYPES from "../../constants/actionTypes";
import * as APIS from "../../constants/apiEndpoints";
import perisistStore from "../../redux/store/store";
import { axiosInstance } from '../../utilities/configureAxios';
import { addQueryParams } from "../../hocs/helpers";

export const login =
  (credentials, onSuccess, onFailure) =>
  (dispatch, getState, { api }) => {
    return api
      .post(APIS.LOGIN, credentials)
      .then((result) => {
        onSuccess();
        api.defaults.headers.common.authorization = `Bearer ${get(
          result,
          "access_token"
        )}`;
        dispatch({
          type: TYPES.LOGIN,
          data: result,
        });
      })
      .catch((error) => {
        onFailure(error?.message);
      });
  };

export const signup =
  (data, onSuccess, onFailure) =>
  (dispatch, getState, { api }) => {
    return api
      .post(APIS.SIGN_UP, data)
      .then((result) => {
        onSuccess();
        dispatch({
          type: TYPES.SIGN_UP,
          data: result,
        });
      })
      .catch((error) => {
        onFailure(error);
      });
  };

export const forgotPassword =
  (data, onSuccess, onFailure) =>
  (dispatch, getState, { api }) => {
    return api
      .post(APIS.FORGOT_PASSWORD, data)
      .then((result) => {
        // api.defaults.headers.common.authorization = `Bearer ${get(
        //   result,
        //   'access_token',
        // )}`;
        onSuccess();
      })
      .catch((error) => {
        onFailure();
        throw error;
      });
  };
export const updateUserProfile =
  (data, email, onSuccess, onFailure) =>
  (dispatch, getState, { api }) => {
    return api
      .put(APIS.UPDATE_USER_PROFILE.replace(":uuid", data?.id), data)
      .then((result) => {
        console.log(result);
        onSuccess();
        dispatch({
          type: TYPES.UPDATE_USER_PROFILE,
          data: get(result, "data"),
        });
      })
      .catch((error) => {
        onFailure();
        throw error;
      });
  };
export const logout =
  () =>
  (dispatch, getState, { api }) => {
    dispatch({
      type: TYPES.LOGOUT,
    });
    const { persistor } = perisistStore;
    persistor.purge();
  };
export const getCampaignUsers = (params) => {
  return axiosInstance.get(`${APIS.GET_CAMPAIGN_USERS}?${addQueryParams(params)}`).then((result) => {
    return result;
  });
};

export const changeDefaultPassword = (user_uuid, payload) => {
  let url = APIS.CHANGE_DEFAULT_PASSWORD.replace('{uuid}', user_uuid);
  return axiosInstance.put(url, payload).then((result) => {
    return result;
  });
};

export const resetPassword = (user_uuid, payload) => {
  let url = APIS.RESET_PASSWORD.replace('{uuid}', user_uuid);
  return axiosInstance.put(url, payload).then((result) => {
    return result;
  });
};

export const updateProfile = (id,data) => {
  let url = APIS.UPDATE_PROFILE.replace('{uuid}',id);
  return axiosInstance.put(url,data).then((result) => {
    return result;
  });
};
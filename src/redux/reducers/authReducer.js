import get from "lodash/get";
import * as TYPES from "../../constants/actionTypes";
import { axiosInstance } from "../../utilities/configureAxios";

const initialState = {
  user: null,
  isLoggedIn: false,
  token: null,
  // selectedKeys: ["1"],
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: get(action, "data.user"),
        token: get(action, "data.access_token"),
      };
    case TYPES.UPDATE_USER_PROFILE:
      return {
        ...state,
        user: get(action, "data"),
      };
    case TYPES.SIGN_UP:
      return {
        ...state,
        isLoggedIn: true,
        user: get(action, "data.user"),
        token: get(action, "data.access_token"),
      };
    // case TYPES.UPDATE_SIDENAV_SELECTED_KEYS:
    //   return {
    //     ...state,
    //     selectedKeys: get(action, "selectedKeys"),
    //   };
    case TYPES.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isLoggedIn: false,
        // selectedKeys: ["1"],
      };
    case "persist/REHYDRATE":
      if (get(action.payload, "auth.token", null)) {
        axiosInstance.defaults.headers.common.authorization = `Bearer ${get(
          action.payload,
          "auth.token",
          null
        )}`;
      }
      return state;

    default:
      return state;
  }
}

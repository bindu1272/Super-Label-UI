/**
 * Constants
 */
import * as APIS from '../../constants/apiEndpoints';
import { axiosInstance } from '../../utilities/configureAxios';
import { addQueryParams } from "../../hocs/helpers";



export const postPreset = (payload) => {
    return axiosInstance.post(APIS.CREATE_PRESET, payload).then((result) => {
      return result;
    });
};

export const getPresets =
  (params) =>{
    return axiosInstance
      .get(`${APIS.GET_PRESETS}?${addQueryParams(params)}`)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  };

export const updatePreset = (campaign_uuid, payload) => {
  let url = APIS.UPDATE_PRESET.replace('{uuid}', campaign_uuid);
  return axiosInstance.put(url, payload).then((result) => {
    return result;
  });
};

export const fetchPresetById = (campaign_uuid) => {
  let url = APIS.FETCH_PRESET_BY_ID.replace('{uuid}', campaign_uuid);
  return axiosInstance.get(url).then((result) => {
    return result;
  });
};

export const deletePreset = (uuid) => {
  let url = APIS.DELETE_PRESET.replace('{uuid}',uuid);
  return axiosInstance.delete(url).then((result) => {
    return result;
  });
};
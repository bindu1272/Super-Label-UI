/**
 * Constants
 */
import * as APIS from '../../constants/apiEndpoints';
import { axiosInstance } from '../../utilities/configureAxios';
import { addQueryParams } from "../../hocs/helpers";



export const postCampaignUser = (payload) => {
    return axiosInstance.post(APIS.SIGN_UP, payload).then((result) => {
      return result;
    });
};

export const getCampaignUsers = () => {
    return axiosInstance.get(APIS.GET_CAMPAIGN_USERS).then((result) => {
      return result;
    });
  };
  
// export const getCampaigns = () => {
//   return axiosInstance.get(APIS.GET_CAMPAIGNS).then((result) => {
//     return result;
//   });
// };


// export const getCampaigns =
//   (params) =>{
//     return axiosInstance
//       .get(`${APIS.GET_CAMPAIGNS}?${addQueryParams(params)}`)
//       .then((result) => {
//         return result;
//       })
//       .catch((error) => {
//         throw error;
//       });
//   };


export const updateCampaignUser = (campaign_uuid, payload) => {
  let url = APIS.UPDATE_CAMPAIGN_USER.replace('{uuid}', campaign_uuid);
  return axiosInstance.put(url, payload).then((result) => {
    return result;
  });
};

export const fetchCampaignUserById = (campaign_uuid) => {
  let url = APIS.FETCH_CAMPAIGN_USER_BY_ID.replace('{uuid}', campaign_uuid);
  return axiosInstance.get(url).then((result) => {
    return result;
  });
};

export const deleteCampaignUserById = (uuid) => {
  let url = APIS.DELETE_CAMPAIGN_USER.replace('{uuid}',uuid);
  return axiosInstance.delete(url).then((result) => {
    return result;
  });
};
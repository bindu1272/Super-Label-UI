/**
 * Constants
 */
import * as APIS from '../../constants/apiEndpoints';
import { axiosInstance } from '../../utilities/configureAxios';
import { addQueryParams } from "../../hocs/helpers";



export const postCampaign = (payload) => {
    return axiosInstance.post(APIS.CREATE_CAMPAIGN, payload).then((result) => {
      return result;
    });
};
// export const getCampaigns = () => {
//   return axiosInstance.get(APIS.GET_CAMPAIGNS).then((result) => {
//     return result;
//   });
// };

export const getCampaigns =
  (params) =>{
    return axiosInstance
      .get(`${APIS.GET_CAMPAIGNS}?${addQueryParams(params)}`)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  };
export const postUploadDistro = (id,email,packs,payload) => {
  let formData = new FormData();
  formData.append("file",payload)
  let url = APIS.UPLOAD_DISTRO.replace('{uuid}',id);
  let url1 = url?.replace('{packs}',packs);
  let url2 = url1.replace('{email}',email);
  return axiosInstance.post(url2,formData).then((result) => {
    return result;
  });
};
export const updateUploadDistro = (id,data) => {
  let url = APIS.UPDATE_UPLOAD_DISTRO.replace('{uuid}',id);
  return axiosInstance.put(url,data).then((result) => {
    return result;
  });
};

export const updateCampaign = (campaign_uuid, payload) => {
  let url = APIS.UPDATE_CAMPAIGN.replace('{uuid}', campaign_uuid);
  return axiosInstance.put(url, payload).then((result) => {
    return result;
  });
};

export const fetchCampaignById = (campaign_uuid) => {
  let url = APIS.FETCH_CAMPAIGN_BY_ID.replace('{uuid}', campaign_uuid);
  return axiosInstance.get(url).then((result) => {
    return result;
  });
};

export const deleteCampaignById = (uuid) => {
  let url = APIS.DELETE_CAMPAIGN.replace('{uuid}',uuid);
  return axiosInstance.delete(url).then((result) => {
    return result;
  });
};

export const campaignManifest = (uuid) => {
  let url = APIS.CAMPAIGN_MANIFEST.replace('{uuid}',uuid);
  return axiosInstance.get(url).then((result) => {
    return result;
  });
};

export const campaignDownloadManifest=(uuid)=>{
  let url = APIS.CAMPAIGN_DOWNLOAD_MANIFEST.replace('{uuid}',uuid);
  return axiosInstance.get(url).then((result) => {
    return result;
  });
}
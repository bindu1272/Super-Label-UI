import {
  Drawer,
  Spin
} from "antd";
import { useEffect, useState } from "react";
import "./style.scss";
import {
  fetchCampaignById,
} from "../../redux/actions/campaignActions";

const DownloadDistroScreen = ({ setShowDownloadDistro, id }) => {
  const [download_distro, setDownload_distro] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchCampaignById(id).then((result) => {
        setLoading(false);
        setDownload_distro(result?.download_distro);
      });
    }
  }, [id]);

  return (
    <Drawer
      width={400}
      open={true}
      onClose={() =>
        id ? setShowDownloadDistro(null) : setShowDownloadDistro(false)
      }
      className="create-asset-page"
      title="Download Distro"
    >
      {loading ? (
        <div className="items-loader">
          <Spin />
        </div>
      ) : 
      (
        <>
      {download_distro?.sort()?.map((distro, index) => {
        return (
          <a href={distro} target="_blank">
            <div>PACK {index + 1}</div>
          </a>
        );
      })
    }
    </>
      )
    }
    </Drawer>
  );
};
export default DownloadDistroScreen;

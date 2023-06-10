import {
    Drawer,
  Spin
  } from "antd";
  import { useEffect, useState } from "react";
  import "./style.scss";
  import {
    fetchCampaignById,
  } from "../../redux/actions/campaignActions";
  
  const DownloadManifestPDFScreen = ({ setShowDownloadManifestPDF, id }) => {
    const [downloadManifestPdf, setDownloadManifestPdf] = useState([]);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      if (id) {
        fetchCampaignById(id).then((result) => {
        setLoading(false);
            setDownloadManifestPdf(result?.manifest_pdf);
        });
      }
    }, [id]);
  
    return (
      <Drawer
        width={400}
        open={true}
        onClose={() =>
          id ? setShowDownloadManifestPDF(null) : setShowDownloadManifestPDF(false)
        }
        className="create-asset-page"
        title="Download Manifest PDF"
      >
         {loading ? (
        <div className="items-loader">
          <Spin />
        </div>
      ) : 
      (
        <>
        {downloadManifestPdf?.map((manifestPdf, index) => {
          return (
            <a href={manifestPdf} target="_blank">
              <div>Manifest PDF {index + 1}</div>
            </a>
          );
        })}
        </>
      )
  }
      </Drawer>
    );
  };
  export default DownloadManifestPDFScreen;
  
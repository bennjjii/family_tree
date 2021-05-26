import harold from "./harold.png";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PublicTreeButton = (props) => {
  const imgStyle = {
    width: "60px",
    height: "60px",
  };
  const history = useHistory();
  const [img, setImg] = useState(undefined);
  const [imgUrl, setImgUrl] = useState(undefined);

  useEffect(() => {
    async function getImg() {
      try {
        const imageBlob = await axios({
          url: `/download_aws_public/${props.familyTreeRoute}`,
          method: "GET",
          responseType: "blob",
        });

        setImg(imageBlob.data);
      } catch (err) {
        console.log(err);
        setImg(undefined);
        setImgUrl(undefined);
      }
    }
    getImg();
  }, [props]);

  useEffect(() => {
    if (img) {
      console.log(img);
      const urlCreator = window.URL || window.webkitURL;
      const dynamicImgUrl = urlCreator.createObjectURL(img);
      setImgUrl(dynamicImgUrl);
    }
  }, [img]);

  return (
    <>
      <button
        className="public-tree-button"
        onClick={() => {
          history.push(`/public/${props.familyTreeRoute}`);
        }}
      >
        <img src={imgUrl} style={imgStyle} />
        <h6>{props.familyTreeName}</h6>
      </button>
    </>
  );
};

export default PublicTreeButton;

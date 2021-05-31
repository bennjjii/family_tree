import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PublicTreeButton = (props) => {
  const imgStyle = {
    width: "60px",
    height: "60px",
  };
  const boxStyle = {
    width: "100px",
    marginBottom: "10px",
    padding: "5px",
  };
  const history = useHistory();
  const [img, setImg] = useState(undefined);
  const [imgUrl, setImgUrl] = useState(undefined);

  useEffect(() => {
    let isMounted = true;
    async function getImg() {
      try {
        const imageBlob = await axios({
          url: `/get_button_thumbnail/${props.familyTreeRoute}`,
          method: "GET",
          responseType: "blob",
        });

        if (isMounted && imageBlob.data) {
          setImg(imageBlob.data);
        }
      } catch (err) {
        console.log(err);
        if (isMounted) {
          setImg(undefined);
          setImgUrl(undefined);
        }
      }
    }
    getImg();
    return () => {
      isMounted = false;
    };
  }, []);

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
        className="transparent-card shadow-sm"
        style={boxStyle}
        onClick={() => {
          history.push(`/public_tree/${props.familyTreeRoute}`);
        }}
      >
        <img src={imgUrl} style={imgStyle} className="idcard-thumbnail" />
        <h6>{props.familyTreeName}</h6>
      </button>
    </>
  );
};

export default PublicTreeButton;

import { useEffect, useState } from "react";
import { useAuth } from "./services/ProvideAuth";

import UploadService from "./services/UploadService";

const FamilyMemberPhoto = (props) => {
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(undefined);
  const thisContext = useAuth();
  const uploadService = new UploadService();

  //wipe state if the user navigates
  useEffect(() => {
    setCurrentFile(undefined);
    setPreviewImage(undefined);
  }, [props.target]);

  const selectFile = (e) => {
    setCurrentFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };
  const upload = () => {
    uploadService.upload(currentFile, props.target, (e) => {}, thisContext.jwt);
  };

  return (
    <div className="idcard-image transparent-card shadow-sm">
      {!props.photourl && !thisContext.showPublic.publicMode && (
        <div className="upload-form">
          <input type="file" accept="image/*" onChange={selectFile} />

          <button disabled={!currentFile} onClick={upload}>
            Upload
          </button>
        </div>
      )}
      {props.photourl && (
        <div id="display-photo">
          <img src={props.photourl} alt="photograph" />
        </div>
      )}

      {previewImage && (
        <div>
          <img src={previewImage} />
        </div>
      )}
    </div>
  );
};

export default FamilyMemberPhoto;

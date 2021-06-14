import axios from "axios";

class UploadService {
  constructor() {}
  upload(file, target, onUploadProgress, jwt) {
    let formData = new FormData();
    let splitFilename = file.name.split(".");
    let extension = "." + splitFilename[splitFilename.length - 1];
    formData.append("file", file, target + extension);

    return axios.post("/upload_aws", formData, {
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: jwt,
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return axios.get("/files");
  }
}

export default UploadService;

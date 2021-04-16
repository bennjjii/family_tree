import CommonHttp from "./CommonHttp";

class UploadService {
  constructor(jwt) {
    this._http = new CommonHttp(jwt);
  }
  upload(file, target, onUploadProgress) {
    let formData = new FormData();
    let splitFilename = file.name.split(".");
    let extension = "." + splitFilename[splitFilename.length - 1];
    formData.append("file", file, target + extension);

    return this._http.axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return this._http.axios.get("/files");
  }
}

export default UploadService;

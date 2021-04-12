import CommonHttp from "./CommonHttp";

class FileUploadService {
  constructor(jwt) {
    this._http = new CommonHttp(jwt);
  }
  upload(file, onUploadProgress, jwt) {
    let formData = new FormData();

    formData.append("file", file);

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

export default FileUploadService;

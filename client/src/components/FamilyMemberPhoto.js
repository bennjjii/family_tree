import { Component } from "react";

import UploadService from "./services/UploadService";

class FamilyMemberPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFile: undefined,
    };
  }

  componentDidUpdate() {
    console.log(this.props.photo);
  }
  render() {
    return (
      <div className="family-member-photo">
        <img src={this.props.photourl} alt="photograph" />

        <form action="/profile" method="post" enctype="multipart/form-data">
          <input type="file" name="avatar" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default FamilyMemberPhoto;

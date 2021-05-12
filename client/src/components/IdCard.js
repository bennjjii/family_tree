import React, { Component } from "react";
import harold from "./harold.png";
import axios from "axios";
import "./IdCard.css";
import ParentsBox from "./ParentsBox";
import ChildrenBox from "./ChildrenBox";
import MarriedBox from "./MarriedBox";
import TargetBox from "./TargetBox";
import NewChild from "./NewChild";
import NewParent from "./NewParent";
import NewSpouse from "./NewSpouse";
import StateTemplate from "./StateTemplate";
import { authContext } from "./services/ProvideAuth";
import FamilyMemberPhoto from "./FamilyMemberPhoto";
import CommonHttp from "./services/CommonHttp";
import EditFamilyMember from "./EditFamilyMember";
import EditMarriage from "./EditMarriage";

class IdCard extends Component {
  static contextType = authContext;
  constructor() {
    super();

    this.state = new StateTemplate();

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTarget = this.updateTarget.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.showNewChild = this.showNewChild.bind(this);
    this.submitNewChild = this.submitNewChild.bind(this);
    this.showNewParent = this.showNewParent.bind(this);
    this.submitNewParent = this.submitNewParent.bind(this);
    this.showNewSpouse = this.showNewSpouse.bind(this);
    this.submitNewSpouse = this.submitNewSpouse.bind(this);
    this.submitPhoto = this.submitPhoto.bind(this);
    this.refreshPhoto = this.refreshPhoto.bind(this);
    this.deleteFamilyMember = this.deleteFamilyMember.bind(this);
    this.deleteMarriage = this.deleteMarriage.bind(this);
    this.showEditFamilyMember = this.showEditFamilyMember.bind(this);
    this.showEditMarriage = this.showEditMarriage.bind(this);
    this.editFamilyMember = this.editFamilyMember.bind(this);
    this.editMarriage = this.editMarriage.bind(this);
  }

  async componentDidMount() {
    this._http = new CommonHttp(this.context.jwt);
    this.setState(
      {
        dataState: {
          ...this.state.dataState,
          uuid_family_member: this.context.focus,
        },
      }
      // () => {
      //   console.log(this.state);
      // }
    );
  }

  async refreshPhoto(prevState) {
    if (
      this.state.dataState.uuid_family_member !==
      prevState.dataState.uuid_family_member
    ) {
      //do stuff
      try {
        const imageBlob = await axios({
          url:
            process.env.REACT_APP_BASE_URL +
            `/files/${this.state.dataState.uuid_family_member}.jpeg`,
          method: "GET",
          responseType: "blob",
          headers: {
            "Content-type": "application/json",
            authorization: this.context.jwt,
          },
        });
        this.setState(
          {
            photo: imageBlob.data,
          },
          () => {
            const urlCreator = window.URL || window.webkitURL;
            const dynamicImgUrl = urlCreator.createObjectURL(this.state.photo);
            this.setState({
              photoUrl: dynamicImgUrl,
            });
          }
        );
      } catch (err) {
        this.setState({
          photo: undefined,
          photoUrl: undefined,
        });
      }
    }
  }

  async refreshData(prevState) {
    if (prevState) {
      if (
        this.state.dataState.uuid_family_member !==
        prevState.dataState.uuid_family_member
      ) {
        const request = { target: this.state.dataState.uuid_family_member };
        const data = await this._http.axios.post("/get_target_data", request);
        this.setState({ dataState: data.data }, () => {
          this.context.setFocus(this.state.dataState.uuid_family_member);
        });
      }
    } else {
      const request = { target: this.state.dataState.uuid_family_member };
      const data = await this._http.axios.post("/get_target_data", request);
      this.setState({ dataState: data.data }, () => {
        this.context.setFocus(this.state.dataState.uuid_family_member);
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.refreshData(prevState);
    this.refreshPhoto(prevState);
    console.log(this.state);
  }

  updateTarget(e) {
    //this is the entry point for all UI navigation actions
    e.preventDefault();
    switch (true) {
      case e.target.className === "nav-btn" && !!e.target.getAttribute("uuid"):
        this.setState({
          dataState: {
            ...this.state.dataState,
            uuid_family_member: e.target.getAttribute("uuid"),
          },
        });

        break;
      case e.target.className === "nav-btn":
        this.showNewParent(e.target.getAttribute("name"));
        break;
      case e.target.className === "edit-button" &&
        e.target.getAttribute("source") !== "marriage":
        this.showEditFamilyMember(
          e.target.getAttribute("source"),
          e.target.getAttribute("uuid")
        );
        break;
      case e.target.className === "edit-button" &&
        e.target.getAttribute("source") === "marriage":
        this.showEditMarriage(e.target.getAttribute("uuid"));
        break;
      case e.target.className === "delete-button" &&
        e.target.getAttribute("source") !== "marriage":
        this.deleteFamilyMember(e.target.getAttribute("uuid"));
        break;
      case e.target.className === "delete-button" &&
        e.target.getAttribute("source") === "marriage":
        this.deleteMarriage(e.target.getAttribute("uuid"));
        break;
    }
  }

  async deleteFamilyMember(target_to_delete) {
    console.log(target_to_delete);
    await this._http.axios.post("/delete", { target_to_delete });
    this.refreshData();
  }

  async deleteMarriage(target_to_delete) {
    console.log(target_to_delete);
    await this._http.axios.post("/delete_marriage", { target_to_delete });
    this.refreshData();
  }

  async editFamilyMember(target_to_edit) {
    console.log(target_to_edit);
    await this._http.axios.post("/edit", { target_to_edit });
    this.refreshData();
  }

  async editMarriage(target_to_edit) {
    console.log(target_to_edit);
    await this._http.axios.post("/edit_marriage", { target_to_edit });
    this.refreshData();
  }

  showNewChild(parentGender) {
    console.log(parentGender);
    this.setState(
      {
        UIstate: {
          editNewChild: true,
        },
      },
      () => {
        console.log(this.state);
      }
    );
  }

  async submitNewChild(newChildDetails) {
    console.log(newChildDetails);
    await this._http.axios.post("/create_new_child", newChildDetails);
    this.setState(
      {
        UIstate: {
          editNewChild: false,
        },
      },
      () => {
        this.refreshData();
      }
    );
  }

  showNewParent(gender) {
    this.setState({
      UIstate: {
        editNewParent: true,
        newParentGender: gender,
      },
    });
  }

  async submitNewParent(newParentDetails) {
    await this._http.axios.post("/create_new_parent", newParentDetails);

    this.setState(
      {
        UIstate: {
          editNewParent: false,
        },
      },
      () => {
        this.refreshData();
      }
    );
  }

  showNewSpouse() {
    this.setState({
      UIstate: { editNewSpouse: true },
    });
  }

  async submitNewSpouse(newSpouseDetails) {
    //total update
    await this._http.axios.post("/create_new_spouse", newSpouseDetails);

    this.setState(
      {
        UIstate: {
          editNewSpouse: false,
        },
      },
      () => {
        this.refreshData();
      }
    );
  }

  async submitPhoto(image) {
    await this._http.post("/upload", image);
    this.refreshData();
  }

  showEditFamilyMember(mode, UUID) {
    this.setState({
      UIstate: {
        editFamilyMember: true,
        editFamilyMemberMode: mode,
        editFamilyMemberUUID: UUID,
      },
    });
  }

  showEditMarriage(UUID) {
    this.setState({
      UIstate: { editMarriage: true, editMarriageUUID: UUID },
    });
  }

  render() {
    let newChildComponent;
    if (this.state.UIstate.editNewChild) {
      newChildComponent = (
        <NewChild
          state={this.state.dataState}
          submitNewChild={this.submitNewChild}
        />
      );
    }

    let newParentComponent;
    if (this.state.UIstate.editNewParent) {
      newParentComponent = (
        <NewParent
          state={this.state.dataState}
          UIstate={this.state.UIstate}
          submitNewParent={this.submitNewParent}
        />
      );
    }

    let newSpouseComponent;
    if (this.state.UIstate.editNewSpouse) {
      newSpouseComponent = (
        <NewSpouse
          state={this.state.dataState}
          submitNewSpouse={this.submitNewSpouse}
        />
      );
    }

    let editFamilyMemberComponent;
    if (this.state.UIstate.editFamilyMember) {
      editFamilyMemberComponent = (
        <EditFamilyMember
          state={this.state.dataState}
          mode={this.state.UIstate.editFamilyMemberMode}
          UUID={this.state.UIstate.editFamilyMemberUUID}
          submitEditedFamilyMember={this.editFamilyMember}
        />
      );
    }
    let editMarriageComponent;
    if (this.state.UIstate.editMarriage) {
      editMarriageComponent = (
        <EditMarriage
          state={this.state.dataState}
          UUID={this.state.UIstate.editMarriageUUID}
          submitEditedMarriageDetails={this.editMarriage}
        />
      );
    }

    return (
      <div className="IdCard">
        {newChildComponent}
        {newParentComponent}
        {newSpouseComponent}
        {editFamilyMemberComponent}
        {editMarriageComponent}

        <div className="top_sect">
          <ParentsBox
            handleUpd={this.updateTarget}
            mother={this.state.dataState.mothe}
            father={this.state.dataState.fathe}
            dataState={this.state.dataState}
          />
        </div>
        <div className="mid_sect">
          <FamilyMemberPhoto
            photourl={this.state.photoUrl}
            target={this.state.dataState.uuid_family_member}
            submitPhoto={this.submitPhoto}
          />
          <TargetBox
            target={this.state.dataState}
            handleUpd={this.updateTarget}
          />
          {/* <div className="uuid_form">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="uuid_box"
                value={this.state.uuid_family_member}
                onChange={this.handleChange}
              ></input>
              <input type="submit" value="Submit" />
            </form>
          </div> */}
        </div>
        <div className="btm_sect">
          <MarriedBox
            spouses={this.state.dataState.spouses}
            handleUpd={this.updateTarget}
            showNewSpouse={this.showNewSpouse}
          />
          <ChildrenBox
            dataState={this.state.dataState}
            updateTarget={this.updateTarget}
            showNewChild={this.showNewChild}
          />
        </div>
      </div>
    );
  }
}

export default IdCard;

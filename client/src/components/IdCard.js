import React, { Component } from "react";
import axios from "axios";
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
import EditFamilyMember from "./EditFamilyMember";
import EditMarriage from "./EditMarriage";
import SettingsDialogue from "./SettingsDialogue";

class IdCard extends Component {
  static contextType = authContext;
  constructor() {
    super();
    this.state = new StateTemplate();
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
    this.showSettings = this.showSettings.bind(this);
    this.getSettings = this.getSettings.bind(this);
    this.setSettings = this.setSettings.bind(this);
    this.cancelDialogues = this.cancelDialogues.bind(this);
    this._http = undefined;
    this.intervalId = undefined;
    this.eventListenerRef = this.eventListenerRef.bind(this);
  }

  async componentDidMount() {
    //reset this to 15m
    if (this.context.jwt) {
      this.intervalId = setInterval(async () => {
        this._http = await this.context.refreshAccessToken();
      }, 60 * 14 * 1000);
    }

    this._http = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        "Content-type": "application/json",
        authorization: this.context.jwt,
      },
    });
    if (this.context.showPublic.publicMode) {
      console.log(this.context.showPublic.focal_member);

      this.setState((prevState, prevProps) => {
        return {
          dataState: {
            ...prevState.dataState,
            uuid_family_member: this.context.showPublic.focal_member,
          },

          UIstate: {
            ...prevState.UIstate,
            getTargetDataUrl: "/get_target_data_public",
            getTargetPhotoUrl: "/download_aws_public/",
          },
        };
      });
    } else {
      this.setState((prevState, prevProps) => {
        return {
          dataState: {
            ...prevState.dataState,
            uuid_family_member: this.context.focus,
          },

          UIstate: {
            ...prevState.UIstate,
            getTargetDataUrl: "/get_target_data",
            getTargetPhotoUrl: "/download_aws/",
          },
        };
      });
    }
    console.log(this.props.location);
    this.getSettings();

    //add event listener for escape key
    document.addEventListener("keydown", this.eventListenerRef);
  }

  eventListenerRef(e) {
    if (e.key === "Escape") {
      this.cancelDialogues();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    document.removeEventListener("keydown", this.eventListenerRef);
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
            //process.env.REACT_APP_BASE_URL +

            `${this.state.UIstate.getTargetPhotoUrl}${this.state.dataState.uuid_family_member}.jpeg`,
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
    //console.log(this.state);
    if (prevState) {
      if (
        this.state.dataState.uuid_family_member !==
        prevState.dataState.uuid_family_member
      ) {
        const request = { target: this.state.dataState.uuid_family_member };
        const data = await this._http.post(
          this.state.UIstate.getTargetDataUrl,
          request
        );
        this.setState({ dataState: data.data }, () => {
          this.context.setFocus(this.state.dataState.uuid_family_member);
          console.log(this.state.dataState);
        });
      }
    } else {
      const request = { target: this.state.dataState.uuid_family_member };
      const data = await this._http.post(
        this.state.UIstate.getTargetDataUrl,
        request
      );
      this.setState({ dataState: data.data }, () => {
        this.context.setFocus(this.state.dataState.uuid_family_member);
        console.log(this.state.dataState);
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.refreshData(prevState);
    this.refreshPhoto(prevState);
  }

  updateTarget(e) {
    //this is the entry point for all UI navigation actions
    //console.log(e.target.id);
    e.preventDefault();
    switch (true) {
      //this just updates state so forcing a refresh from the server based on the focal UUID
      case e.target.id === "nav-btn" && !!e.target.getAttribute("uuid"):
        this.setState({
          dataState: {
            ...this.state.dataState,
            uuid_family_member: e.target.getAttribute("uuid"),
          },
        });

        break;
      //this loads new parent dialogue
      case e.target.id === "nav-btn":
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

  showNewChild(parentGender) {
    //console.log(parentGender);
    this.setState(
      (prevState, prevProps) => {
        return {
          UIstate: {
            ...prevState.UIstate,
            editNewChild: true,
          },
        };
      },
      () => {
        console.log(this.state);
      }
    );
    this.context.setBlockUI(true);
  }

  async submitNewChild(newChildDetails) {
    console.log(newChildDetails);
    await this._http.post("/create_new_child", newChildDetails);
    this.cancelDialogues();
    // this.setState(
    //   (prevState, prevProps) => {
    //     return {
    //       UIstate: {
    //         ...prevState.UIstate,
    //         editNewChild: false,
    //       },
    //     };
    //   },
    //   () => {
    //     this.refreshData();
    //   }
    // );
  }

  showNewParent(gender) {
    this.setState((prevState, prevProps) => {
      return {
        UIstate: {
          ...prevState.UIstate,
          editNewParent: true,
          newParentGender: gender ? gender : undefined,
        },
      };
    });
    this.context.setBlockUI(true);
  }

  async submitNewParent(newParentDetails) {
    await this._http.post("/create_new_parent", newParentDetails);
    this.cancelDialogues();
    // this.showNewParent(false);
    // this.setState(
    //   (prevState, prevProps) => {
    //     return {
    //       UIstate: {
    //         ...prevState.UIstate,
    //         editNewParent: false,
    //         newParentGender: undefined,
    //       },
    //     };
    //   },

    //   () => {
    //     this.refreshData();
    //   }
    // );
  }

  showNewSpouse() {
    this.setState((prevState, prevProps) => {
      return {
        UIstate: {
          ...prevState.UIstate,
          editNewSpouse: true,
        },
      };
    });
    this.context.setBlockUI(true);
  }

  async submitNewSpouse(newSpouseDetails) {
    //total update
    await this._http.post("/create_new_spouse", newSpouseDetails);
    this.cancelDialogues();
    // this.setState(
    //   (prevState, prevProps) => {
    //     return {
    //       UIstate: {
    //         ...prevState.UIstate,
    //         editNewSpouse: false,
    //       },
    //     };
    //   },

    //   () => {
    //     this.refreshData();
    //   }
    // );
  }

  async submitPhoto(image) {
    await this._http.post("/upload", image);
    this.refreshData();
  }

  showEditFamilyMember(mode, UUID) {
    this.setState((prevState, prevProps) => {
      return {
        UIstate: {
          ...prevState.UIstate,
          editFamilyMember: true,
          editFamilyMemberMode: mode,
          editFamilyMemberUUID: UUID,
        },
      };
    });
    this.context.setBlockUI(true);
  }

  async editFamilyMember(target_to_edit) {
    console.log(target_to_edit);
    await this._http.post("/edit", { target_to_edit });
    this.cancelDialogues();
    // this.setState((prevState, prevProps) => {
    //   return {
    //     UIstate: {
    //       ...prevState.UIstate,
    //       editFamilyMember: false,
    //       editFamilyMemberMode: undefined,
    //       editFamilyMemberUUID: undefined,
    //     },
    //   };
    // });
    // this.refreshData();
  }

  async deleteFamilyMember(target_to_delete) {
    console.log(target_to_delete);
    await this._http.post("/delete", { target_to_delete });
    this.refreshData();
  }

  showEditMarriage(UUID) {
    this.setState((prevState, prevProps) => {
      return {
        UIstate: {
          ...prevState.UIstate,
          editMarriage: true,
          editMarriageUUID: UUID,
        },
      };
    });
    this.context.setBlockUI(true);
  }

  async editMarriage(target_to_edit) {
    console.log(target_to_edit);
    await this._http.post("/edit_marriage", { target_to_edit });
    this.cancelDialogues();

    // this.setState((prevState, prevProps) => {
    //   return {
    //     UIstate: {
    //       ...prevState.UIstate,
    //       editMarriage: false,
    //       editMarriageUUID: undefined,
    //     },
    //   };
    // });
    // this.refreshData();
  }

  async deleteMarriage(target_to_delete) {
    console.log(target_to_delete);
    await this._http.post("/delete_marriage", { target_to_delete });
    this.refreshData();
  }

  showSettings(show) {
    this.setState((prevState, prevProps) => {
      return {
        UIstate: {
          ...prevState.UIstate,
          showSettings: show,
        },
      };
    });
    this.context.setBlockUI(show);
  }

  async getSettings() {
    console.log("GettingSettings");
    let settings = await this._http.get("/get_settings");
    console.log(settings);
    this.setState((prevState, prevProps) => {
      return {
        isPublic: settings.data.isPublic,
        publicName: settings.data.publicName,
      };
    });
  }

  async setSettings(formData) {
    console.log(formData);
    let updatedSettings = await this._http.post("/set_settings", formData);
    this.showSettings(false);
    this.getSettings();
  }

  cancelDialogues() {
    this.context.setBlockUI(false);
    this.setState(
      (prevState, prevProps) => {
        return {
          UIstate: {
            ...prevState.UIstate,
            editNewChild: false,
            editNewParent: false,
            editNewSpouse: false,
            newParentGender: undefined,
            editFamilyMember: false,
            editFamilyMemberMode: undefined,
            editFamilyMemberUUID: undefined,
            editMarriage: false,
            editMarriageUUID: undefined,
            showSettings: false,
          },
        };
      },

      () => {
        this.refreshData();
      }
    );
  }

  render() {
    let newChildComponent;
    if (this.state.UIstate.editNewChild) {
      newChildComponent = (
        <NewChild
          state={this.state.dataState}
          submitNewChild={this.submitNewChild}
          cancel={this.cancelDialogues}
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
          cancel={this.cancelDialogues}
        />
      );
    }

    let newSpouseComponent;
    if (this.state.UIstate.editNewSpouse) {
      newSpouseComponent = (
        <NewSpouse
          state={this.state.dataState}
          submitNewSpouse={this.submitNewSpouse}
          cancel={this.cancelDialogues}
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
          cancel={this.cancelDialogues}
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
          cancel={this.cancelDialogues}
        />
      );
    }

    let settingsComponent;
    if (this.state.UIstate.showSettings) {
      settingsComponent = (
        <SettingsDialogue
          isPublic={this.state.isPublic}
          publicName={this.state.publicName}
          setSettings={this.setSettings}
          cancel={this.cancelDialogues}
        />
      );
    }

    return (
      <div className="idcard transparent-bg transparent-card">
        {newChildComponent}
        {newParentComponent}
        {newSpouseComponent}
        {editFamilyMemberComponent}
        {editMarriageComponent}
        {settingsComponent}

        <div className="idcard-sect">
          <ParentsBox
            handleUpd={this.updateTarget}
            mother={this.state.dataState.mothe}
            father={this.state.dataState.fathe}
            dataState={this.state.dataState}
            showSettings={this.showSettings}
          />
        </div>
        <div className="idcard-sect ">
          <FamilyMemberPhoto
            photourl={this.state.photoUrl}
            target={this.state.dataState.uuid_family_member}
            authorizedHttpClient={this._http}
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
        <div className="idcard-sect">
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

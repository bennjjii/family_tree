import React, { Component } from "react";
import harold from "./harold.png";
import axios from "axios";
import "./IdCard.css";
import ParentsBox from "./ParentsBox";
import ChildrenBox from "./ChildrenBox";
import MarriedBox from "./MarriedBox";
import TargetBox from "./TargetBox";
import validator from "validator";
import NewChild from "./NewChild";
import NewParent from "./NewParent";
import NewSpouse from "./NewSpouse";
import StateTemplate from "./StateTemplate";
import { authContext } from "./ProvideAuth";

class IdCard extends Component {
  static contextType = authContext;
  constructor() {
    super();

    this.state = new StateTemplate();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTarget = this.updateTarget.bind(this);
    this.showNewChild = this.showNewChild.bind(this);
    this.submitNewChild = this.submitNewChild.bind(this);
    this.showNewParent = this.showNewParent.bind(this);
    this.submitNewParent = this.submitNewParent.bind(this);
    this.showNewSpouse = this.showNewSpouse.bind(this);
    this.submitNewSpouse = this.submitNewSpouse.bind(this);
  }

  componentDidMount() {
    if (this.state.uuid_target === "") {
      this.setState({
        uuid_target: this.context.focus,
      });
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.uuid_target !== prevState.uuid_target) {
  //     this.setState({}, () => {
  //       if (validator.isUUID(this.state.uuid_target)) {
  //         axios
  //           .get(
  //             "http://localhost:5000/get_target_data/" + this.state.uuid_target,
  //             {
  //               headers: {
  //                 authorization: this.context.jwt,
  //               },
  //             }
  //           )
  //           .then((resp) => {
  //             this.setState(resp.data, () => {
  //               this.context.setFocus(this.state.uuid_target);
  //             });
  //             // this.setState({
  //             //   uuid_box: "704459f2-c51b-4433-9991-30a4ef63c63f",
  //             // });
  //           });
  //       }
  //     });
  //   }

  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.uuid_target !== prevState.uuid_target) {
      this.setState({}, () => {
        if (validator.isUUID(this.state.uuid_target)) {
          const request = { target: this.state.uuid_target };

          axios
            .post("http://localhost:5000/get_target_data/", request, {
              headers: {
                authorization: this.context.jwt,
              },
            })
            .then((resp) => {
              this.setState(resp.data, () => {
                this.context.setFocus(this.state.uuid_target);
              });
              // this.setState({
              //   uuid_box: "704459f2-c51b-4433-9991-30a4ef63c63f",
              // });
            });
        }
      });
    }
  }

  updateTarget(e) {
    e.preventDefault();
    if (e.target.getAttribute("uuid") !== "") {
      if (e.target.getAttribute("uuid")) {
        if (e.target.getAttribute("uuid") !== this.state.uuid_target) {
          this.setState({
            uuid_target: e.target.getAttribute("uuid"),
          });
        }
      }
    } else {
      this.showNewParent(e.target.getAttribute("name"));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      uuid_target: prevState.uuid_box,
    }));
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
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

  submitNewChild(newChildDetails) {
    axios
      .post("http://localhost:5000/create_new_child", newChildDetails)
      .then((response) => {
        const child = {
          name: [
            response.data.chil.first_name,
            response.data.chil.middle_name,
            response.data.chil.last_name,
          ],
          d_o_b: response.data.d_o_b,
          uuid: response.data.chil.uuid_family_member,
        };
        const children = [...this.state.children];
        children.push(child);
        this.setState({
          children: children,
          UIstate: { editNewChild: false },
        });
      });
  }

  showNewParent(gender) {
    console.log(gender);
    this.setState({
      UIstate: {
        editNewParent: true,
        newParentGender: gender,
      },
    });
  }

  submitNewParent(newParentDetails) {
    newParentDetails.uuid_birth = this.state.target.birth_uuid;
    newParentDetails.uuid_family_tree = this.context.uuidFamilyTree;
    axios
      .post("http://localhost:5000/create_new_parent", newParentDetails)
      .then((response) => {
        console.log(response);
        this.setState(response.data);
        this.setState({
          UIstate: {
            editNewParent: false,
          },
        });
      });
  }

  showNewSpouse() {
    this.setState({
      UIstate: { editNewSpouse: true },
    });
  }

  submitNewSpouse(newSpouseDetails) {
    console.log("New Spouse being submitted");
    axios
      .post("http://localhost:5000/create_new_spouse", newSpouseDetails)
      .then((resp) => {
        console.log(resp);
        this.setState({
          UIstate: {
            editNewSpouse: false,
          },
        });
      });
  }

  render() {
    let newChildComponent;
    if (this.state.UIstate.editNewChild) {
      newChildComponent = (
        <NewChild state={this.state} submitNewChild={this.submitNewChild} />
      );
    }

    let newParentComponent;
    if (this.state.UIstate.editNewParent) {
      newParentComponent = (
        <NewParent state={this.state} submitNewParent={this.submitNewParent} />
      );
    }

    let newSpouseComponent;
    if (this.state.UIstate.editNewSpouse) {
      newSpouseComponent = (
        <NewSpouse
          target_uuid={this.state.uuid_target}
          target_gender={this.state.target.gender}
          submitNewSpouse={this.submitNewSpouse}
        />
      );
    }

    return (
      <div className="IdCard">
        {newChildComponent}
        {newParentComponent}
        {newSpouseComponent}

        <div className="top_sect">
          <ParentsBox
            handleUpd={this.updateTarget}
            mother={this.state.mother}
            father={this.state.father}
          />
        </div>
        <div className="mid_sect">
          <div className="family_image">
            <img src={harold} alt="photograph of family member" />
          </div>
          <TargetBox target={this.state.target} />
          <div className="uuid_form">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="uuid_box"
                value={this.state.uuid_box}
                onChange={this.handleChange}
              ></input>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <div className="btm_sect">
          <MarriedBox
            spouses={this.state.spouses}
            handleUpd={this.updateTarget}
            showNewSpouse={this.showNewSpouse}
          />
          <ChildrenBox
            children={this.state.children}
            handleUpd={this.updateTarget}
            showNewChild={this.showNewChild}
          />
        </div>
      </div>
    );
  }
}

export default IdCard;

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
  }

  componentDidMount() {
    this.setState(
      {
        dataState: {
          ...this.state.dataState,
          uuid_family_member: this.context.focus,
        },
      },
      () => {
        console.log(this.state);
      }
    );
  }

  async refreshData(prevState) {
    if (prevState) {
      if (
        this.state.dataState.uuid_family_member !==
        prevState.dataState.uuid_family_member
      ) {
        const request = { target: this.state.dataState.uuid_family_member };
        const data = await axios.post(
          "http://localhost:5000/get_target_data/",
          request,
          {
            headers: {
              authorization: this.context.jwt,
            },
          }
        );
        this.setState({ dataState: data.data }, () => {
          this.context.setFocus(this.state.dataState.uuid_family_member);
        });
      }
    } else {
      const request = { target: this.state.dataState.uuid_family_member };
      const data = await axios.post(
        "http://localhost:5000/get_target_data/",
        request,
        {
          headers: {
            authorization: this.context.jwt,
          },
        }
      );
      this.setState({ dataState: data.data }, () => {
        this.context.setFocus(this.state.dataState.uuid_family_member);
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.refreshData(prevState);
    console.log(this.state);
  }

  updateTarget(e) {
    e.preventDefault();
    if (e.target.getAttribute("uuid")) {
      if (e.target.getAttribute("uuid")) {
        if (
          e.target.getAttribute("uuid") !==
          this.state.dataState.uuid_family_member
        ) {
          this.setState({
            dataState: {
              ...this.state.dataState,
              uuid_family_member: e.target.getAttribute("uuid"),
            },
          });
        }
      }
    } else {
      this.showNewParent(e.target.getAttribute("name"));
    }
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   this.setState((prevState) => ({
  //     uuid_target: prevState.uuid_box,
  //   }));
  // }

  // handleChange(e) {
  //   const { name, value } = e.target;
  //   this.setState({
  //     [name]: value,
  //   });
  // }

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
    await axios.post(
      "http://localhost:5000/create_new_child",
      newChildDetails,
      {
        headers: {
          authorization: this.context.jwt,
        },
      }
    );
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
    console.log(gender);
    this.setState({
      UIstate: {
        editNewParent: true,
        newParentGender: gender,
      },
    });
  }

  async submitNewParent(newParentDetails) {
    await axios.post(
      "http://localhost:5000/create_new_parent",
      newParentDetails,
      {
        headers: {
          authorization: this.context.jwt,
        },
      }
    );

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

  submitNewSpouse(newSpouseDetails) {
    //total update
    axios
      .post("http://localhost:5000/create_new_spouse", newSpouseDetails, {
        headers: {
          authorization: this.context.jwt,
        },
      })
      .then((resp) => {
        console.log(resp.data);

        this.setState((prevState, prevProps) => ({
          spouses: [...prevState.spouses, resp.data],
        }));

        //unfinished - handle the returned new spouse + insert into the data structure
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

    // let newSpouseComponent;
    // if (this.state.UIstate.editNewSpouse) {
    //   newSpouseComponent = (
    //     <NewSpouse
    //       state={this.state.dataState}
    //       submitNewSpouse={this.submitNewSpouse}
    //     />
    //   );
    // }

    return (
      <div className="IdCard">
        {newChildComponent}
        {newParentComponent}
        {/* {newSpouseComponent} */}

        <div className="top_sect">
          <ParentsBox
            handleUpd={this.updateTarget}
            mother={this.state.dataState.mothe}
            father={this.state.dataState.fathe}
          />
        </div>
        <div className="mid_sect">
          <div className="family_image">
            <img src={harold} alt="photograph of family member" />
          </div>
          <TargetBox target={this.state.dataState} />
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
            children={this.state.dataState.children}
            updateTarget={this.updateTarget}
            showNewChild={this.showNewChild}
          />
        </div>
      </div>
    );
  }
}

export default IdCard;

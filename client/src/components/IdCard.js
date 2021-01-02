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

class IdCard extends Component {
  constructor() {
    super();
    const initState = {
      target: { name: ["", "", ""], gender: null, born: null, died: null },
      mother: {
        name: ["", "", ""],
        uuid: "",
      },
      father: {
        name: ["", "", ""],
        uuid: "",
      },
      children: [
        {
          name: ["", "", ""],
          d_o_b: null,
          uuid: "",
        },
      ],
      spouses: [
        {
          name: ["", "", ""],
          uuid: "",
          d_o_mar: null,
          d_o_div: null,
        },
      ],
    };
    this.state = {
      uuid_box: "442f0558-cc6e-47ed-bb82-0d0abe95f1ac",
      uuid_target: "",
      target: { name: ["", "", ""], gender: null, born: null, died: null },
      mother: {
        name: ["", "", ""],
        uuid: "",
      },
      father: {
        name: ["", "", ""],
        uuid: "",
      },
      children: [
        {
          name: ["", "", ""],
          d_o_b: null,
          uuid: "",
        },
      ],
      spouses: [
        {
          name: ["", "", ""],
          uuid: "",
          d_o_mar: null,
          d_o_div: null,
        },
      ],
      editMode: false,
      editNewChild: false,
      editNewParent: false,
      newChildStyle: {
        display: "none",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTarget = this.updateTarget.bind(this);
    this.showNewChild = this.showNewChild.bind(this);
    this.submitNewChild = this.submitNewChild.bind(this);
  }

  componentDidMount() {
    if (this.state.uuid_target === "") {
      this.setState({
        uuid_target: "442f0558-cc6e-47ed-bb82-0d0abe95f1ac",
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.uuid_target !== prevState.uuid_target) {
      this.setState(this.initState, () => {
        if (validator.isUUID(this.state.uuid_target)) {
          axios
            .get(
              "http://localhost:5000/get_target_data/" + this.state.uuid_target
            )
            .then((resp) => {
              this.setState(resp.data);
            });
        }
      });
    }
  }

  updateTarget(e) {
    e.preventDefault();
    console.log(e.target);
    if (e.target.getAttribute("uuid")) {
      if (e.target.getAttribute("uuid") !== this.state.uuid_target) {
        this.setState({
          uuid_target: e.target.getAttribute("uuid"),
        });
      }
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

  showNewChild(stuff) {
    console.log(stuff);
    this.setState({
      editNewChild: true,
    });
  }

  submitNewChild(newChildResponse) {
    axios
      .post("http://localhost:5000/create_new_child", newChildResponse)
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
          editNewChild: false,
        });
      });
  }

  showNewParent(stuff) {
    console.log(stuff);
    this.setState({
      editNewParent: true,
    });
  }

  submitNewParent(newParentResponse) {
    // axios
    //   .post("http://localhost:5000/create_new_parent", newParentResponse)
    //   .then((response) => {
    //     const parent = {
    //       name: [
    //         response.data.chil.first_name,
    //         response.data.chil.middle_name,
    //         response.data.chil.last_name,
    //       ],
    //       d_o_b: response.data.d_o_b,
    //       uuid: response.data.chil.uuid_family_member,
    //     };
    //     const children = [...this.state.children];
    //     children.push(child);
    //     this.setState({
    //       children: children,
    //       editNewChild: false,
    //     });
    //   });
  }

  render() {
    let newChildComponent;
    if (this.state.editNewChild) {
      newChildComponent = (
        <NewChild
          target={this.state.uuid_target}
          d_o_b={this.state.target.born}
          targetParentGender={this.state.target.gender}
          targetSpouses={this.state.spouses}
          submitNewChild={this.submitNewChild}
        />
      );
    }

    // let newParentComponent;
    // if (this.state.editNewParent) {
    //   newParentComponent = (
    //     <NewParent
    //       target={this.state.uuid_target}
    //       targetGender={this.state.target.gender}
    //       targetMother={this.state.mother}
    //       targetFather={this.state.father}
    //       submitNewParent={this.submitNewParent}
    //     />
    //   );
    // }

    return (
      <div className="IdCard">
        {newChildComponent}
        {/* <NewParent /> */}

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

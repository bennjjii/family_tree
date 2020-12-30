import React, { Component } from "react";
import Child from "./Child";

export class ChildrenBox extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="children_box">
        <button className="plus_button" onClick={this.props.addChild}>
          +
        </button>
        <h5>Children:</h5>
        {this.props.children.map((child, index) => {
          return (
            <>
              <Child
                handleUpdate={this.props.handleUpd}
                name={child.name}
                uuid={child.uuid}
                d_o_b={child.d_o_b}
                key={child.uuid + index}
              />
            </>
          );
        })}
      </div>
    );
  }
}

export default ChildrenBox;

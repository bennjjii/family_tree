import { Component } from "react";

class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
    };
  }

  render() {
    return (
      <>
        <button
          className="parents-btn"
          name={this.props.name}
          onClick={this.props.handleUpdate}
          uuid={this.props.uuid}
          key={this.props.key + "btn"}
        >
          {this.props.name.join(" ")}

          <br key={this.props.key + "br1"} />
          {this.props.d_o_b}
          <i class="far fa-edit"></i>
        </button>
        <br key={this.props.key + "br2"} />
      </>
    );
  }
}

export default Child;

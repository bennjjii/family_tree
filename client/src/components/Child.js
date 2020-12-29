import { Component } from "react";

class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      inputStyle: {
        display: "none",
      },
      textStyle: {
        display: "inline-block",
      },
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log(e);
    if (this.state.editMode === false) {
      this.setState({
        editMode: true,
        inputStyle: {
          display: "inline-block",
        },
        textStyle: {
          display: "none",
        },
      });
    } else {
      this.setState({
        editMode: false,
        inputStyle: {
          display: "none",
        },
        textStyle: {
          display: "inline-block",
        },
      });
    }
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
          <form>
            <input style={this.state.inputStyle}></input>
          </form>
          <span
            style={this.state.textStyle}
            uuid={this.props.uuid}
            className="child-name"
          >
            {this.props.name.join(" ")}
          </span>

          <br key={this.props.key + "br1"} />
          {this.props.d_o_b}
          <i onClick={this.handleClick} className="far fa-edit"></i>
        </button>

        <br key={this.props.key + "br2"} />
      </>
    );
  }
}

export default Child;

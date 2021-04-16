import _fn from "./fullName";

const TargetBox = (props) => {
  return (
    <div className="person_details">
      <h4>{_fn(props.target)}</h4>
      <h6>Born: {props.target.d_o_b}</h6>
      <h6>Gender: {props.target.gender}</h6>
    </div>
  );
};

export default TargetBox;

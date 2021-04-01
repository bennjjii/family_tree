const TargetBox = (props) => {
  return (
    <div className="person_details">
      <h4>
        {props.target.first_name +
          " " +
          props.target.middle_name +
          " " +
          props.target.last_name}
      </h4>
      <h6>Born: {props.target.d_o_b}</h6>
    </div>
  );
};

export default TargetBox;

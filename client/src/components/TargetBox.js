const TargetBox = (props) => {
  return (
    <div className="person_details">
      <h4>{props.target.name.join(" ")}</h4>
      <h6>Born: {props.target.born}</h6>
    </div>
  );
};

export default TargetBox;

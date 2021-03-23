const ParentsBox = (props) => {
  return (
    <div className="parent_details">
      <h5>Parents: </h5>
      <div>
        <button
          name="Male"
          className="parents-btn"
          uuid={props.father.uuid}
          onClick={props.handleUpd}
        >
          {props.father.uuid !== ""
            ? props.father.name.join(" ")
            : "Add father"}
        </button>
        <button
          name="Female"
          className="parents-btn"
          uuid={props.mother.uuid}
          onClick={props.handleUpd}
        >
          {props.mother.uuid !== ""
            ? props.mother.name.join(" ")
            : "Add mother"}
        </button>
      </div>
    </div>
  );
};

export default ParentsBox;

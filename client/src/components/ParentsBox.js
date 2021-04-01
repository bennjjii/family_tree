const ParentsBox = (props) => {
  return (
    <div className="parent_details">
      <h5>Parents: </h5>
      <div>
        <button
          name="Male"
          className="parents-btn"
          uuid={props.father.uuid_family_member}
          onClick={props.handleUpd}
        >
          {props.father.uuid_family_member !== ""
            ? props.father.first_name +
              " " +
              props.father.middle_name +
              " " +
              props.father.last_name
            : "Add father"}
        </button>
        <button
          name="Female"
          className="parents-btn"
          uuid={props.mother.uuid_family_member}
          onClick={props.handleUpd}
        >
          {props.mother.uuid_family_member !== ""
            ? props.mother.first_name +
              " " +
              props.mother.middle_name +
              " " +
              props.mother.last_name
            : "Add mother"}
        </button>
      </div>
    </div>
  );
};

export default ParentsBox;

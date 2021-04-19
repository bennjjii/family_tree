import EditDelete from "./EditDelete";

const ParentsBox = (props) => {
  return (
    <div className="parent_details">
      <h5>Parents: </h5>
      <div>
        <button
          name="Male"
          className="nav-btn"
          uuid={
            (props.father || {}).uuid_family_member &&
            props.father.uuid_family_member
          }
          onClick={props.handleUpd}
        >
          {props.father
            ? props.father.first_name +
              " " +
              props.father.middle_name +
              " " +
              props.father.last_name
            : "Add father"}

          <EditDelete
            uuid={
              (props.father || {}).uuid_family_member &&
              props.father.uuid_family_member
            }
            permitDelete={
              props.father
                ? props.father.father || props.father.mother
                  ? false
                  : true
                : false
            }
          />
        </button>
        <button
          name="Female"
          className="nav-btn"
          uuid={
            (props.mother || {}).uuid_family_member &&
            props.mother.uuid_family_member
          }
          onClick={props.handleUpd}
        >
          {props.mother
            ? props.mother.first_name +
              " " +
              props.mother.middle_name +
              " " +
              props.mother.last_name
            : "Add mother"}

          <EditDelete
            uuid={
              (props.mother || {}).uuid_family_member &&
              props.mother.uuid_family_member
            }
            permitDelete={
              props.mother
                ? props.mother.father || props.mother.mother
                  ? false
                  : true
                : false
            }
          />
        </button>
      </div>
    </div>
  );
};

export default ParentsBox;

import EditDelete from "./EditDelete";
import { useEffect } from "react";

//parent could have other children
//so it's not enough to check that they just don't have any parents

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
            source="father"
            uuid={
              (props.father || {}).uuid_family_member &&
              props.father.uuid_family_member
            }
            permitDelete={
              (props.dataState.fathe
                ? !(props.dataState.fathe.fathe || props.dataState.fathe.mothe)
                : false) &&
              (props.dataState.siblingsViaFather
                ? props.dataState.siblingsViaFather.length <= 1
                : false)
                ? true
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
          {}

          <EditDelete
            source="mother"
            uuid={
              (props.mother || {}).uuid_family_member &&
              props.mother.uuid_family_member
            }
            permitDelete={
              (props.dataState.mothe
                ? !(props.dataState.mothe.fathe || props.dataState.mothe.mothe)
                : false) &&
              (props.dataState.siblingsViaMother
                ? props.dataState.siblingsViaMother.length <= 1
                : false)
                ? true
                : false
            }
          />
        </button>
      </div>
    </div>
  );
};

export default ParentsBox;

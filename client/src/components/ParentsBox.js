import EditDelete from "./EditDelete";
import { useAuth } from "./services/ProvideAuth";

//parent could have other children
//so it's not enough to check that they just don't have any parents

const ParentsBox = (props) => {
  const thisContext = useAuth();
  return (
    <div className="parent_details">
      <h5>
        Parents:{" "}
        <span
          style={{
            float: "right",
            marginRight: "5px",
          }}
        >
          {!thisContext.showPublic.publicMode && (
            <button
              className="settings-button"
              onClick={() => {
                props.showSettings(true);
              }}
            >
              <i className="fa fa-wrench" aria-hidden="true"></i>
            </button>
          )}
        </span>
      </h5>

      <div>
        <button
          disabled={thisContext.showPublic.publicMode && !props.father}
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
            : !thisContext.showPublic.publicMode
            ? "Add father"
            : "..."}

          {!thisContext.showPublic.publicMode && (
            <EditDelete
              source="father"
              uuid={
                (props.father || {}).uuid_family_member &&
                props.father.uuid_family_member
              }
              disableEdit={props.dataState.fathe ? false : true}
              permitDelete={
                (props.dataState.fathe
                  ? !(
                      props.dataState.fathe.fathe || props.dataState.fathe.mothe
                    )
                  : false) &&
                (props.dataState.siblingsViaFather
                  ? props.dataState.siblingsViaFather.length <= 1
                  : false)
                  ? true
                  : false
              }
            />
          )}
        </button>
        <button
          disabled={thisContext.showPublic.publicMode && !props.mother}
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
            : !thisContext.showPublic.publicMode
            ? "Add mother"
            : "..."}
          {}

          {!thisContext.showPublic.publicMode && (
            <EditDelete
              source="mother"
              uuid={
                (props.mother || {}).uuid_family_member &&
                props.mother.uuid_family_member
              }
              disableEdit={props.dataState.mothe ? false : true}
              permitDelete={
                (props.dataState.mothe
                  ? !(
                      props.dataState.mothe.fathe || props.dataState.mothe.mothe
                    )
                  : false) &&
                (props.dataState.siblingsViaMother
                  ? props.dataState.siblingsViaMother.length <= 1
                  : false)
                  ? true
                  : false
              }
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default ParentsBox;

import Child from "./Child";
import { useAuth } from "./services/ProvideAuth";

const ChildrenBox = (props) => {
  const thisContext = useAuth();
  return (
    <div className="idcard-component transparent-card shadow-sm">
      {!thisContext.showPublic.publicMode && (
        <button
          className="bubble-button"
          onClick={props.showNewChild}
          disabled={thisContext.blockUI}
        >
          +
        </button>
      )}
      <h5>children:</h5>
      <br />
      {props.dataState.children.map((child, index) => {
        return (
          <Child
            child={child}
            updateTarget={props.updateTarget}
            key={child.uuid_family_member + "child"}
          />
        );
      })}
    </div>
  );
};

export default ChildrenBox;

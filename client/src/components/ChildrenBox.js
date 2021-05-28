import Child from "./Child";
import { useAuth } from "./services/ProvideAuth";

const ChildrenBox = (props) => {
  const thisContext = useAuth();
  return (
    <div className="children_box">
      {!thisContext.showPublic.publicMode && (
        <button className="plus_button" onClick={props.showNewChild}>
          +
        </button>
      )}
      <h5>Children:</h5>
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

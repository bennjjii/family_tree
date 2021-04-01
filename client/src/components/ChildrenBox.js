import Child from "./Child";

const ChildrenBox = (props) => {
  return (
    <div className="children_box">
      <button className="plus_button" onClick={props.showNewChild}>
        +
      </button>
      <h5>Children:</h5>
      {props.children.map((child, index) => {
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

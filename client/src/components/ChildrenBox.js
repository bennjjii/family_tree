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
          <>
            <Child
              handleUpdate={props.handleUpd}
              name={child.name}
              uuid={child.uuid}
              d_o_b={child.d_o_b}
              key={child.uuid + index}
            />
          </>
        );
      })}
    </div>
  );
};

export default ChildrenBox;

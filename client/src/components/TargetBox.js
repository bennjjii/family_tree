import _fn from "./fullName";
import EditDelete from "./EditDelete";
import { useAuth } from "./services/ProvideAuth";

const TargetBox = (props) => {
  const thisContext = useAuth();
  return (
    <div className="person_details">
      <h4>{_fn(props.target)}</h4>
      <h6>Born: {props.target.d_o_b}</h6>
      <h6>Gender: {props.target.gender}</h6>
      {!thisContext.showPublic.publicMode && (
        <EditDelete
          handleUpd={props.handleUpd}
          onlyEdit={true}
          source="target"
          uuid={props.target.uuid_family_member}
        />
      )}
    </div>
  );
};

export default TargetBox;

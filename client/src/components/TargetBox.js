import _fn from "./fullName";
import EditDelete from "./EditDelete";
import { useAuth } from "./services/ProvideAuth";
import moment from "moment";

const TargetBox = (props) => {
  const compStyle = {
    flexBasis: "300px",
  };
  const thisContext = useAuth();

  return (
    <div
      style={compStyle}
      className="idcard-component transparent-card shadow-sm"
    >
      {!thisContext.showPublic.publicMode && (
        <EditDelete
          handleUpd={props.handleUpd}
          onlyEdit={true}
          source="target"
          uuid={props.target.uuid_family_member}
        />
      )}
      <h4>{_fn(props.target)}</h4>
      <h6>
        Born:{" "}
        {moment(props.target.d_o_b, "YYYY-MM-DD").format("dddd, MMMM Do YYYY")}
      </h6>
    </div>
  );
};

export default TargetBox;

import { useAuth } from "./services/ProvideAuth";

const EditDelete = (props) => {
  const thisContext = useAuth();
  return (
    <div className={"edit-delete"}>
      <button
        source={props.source}
        className="edit-button"
        uuid={props.uuid}
        onClick={props.handleUpd}
        disabled={props.disableEdit ? props.disableEdit : thisContext.blockUI}
      >
        <i className="far fa-edit"></i>
      </button>
      {!props.onlyEdit && (
        <button
          source={props.source}
          className="delete-button"
          uuid={props.uuid}
          onClick={props.handleUpd}
          disabled={!props.permitDelete || thisContext.blockUI}
        >
          <i className="far fa-trash-alt"></i>
        </button>
      )}
    </div>
  );
};

export default EditDelete;

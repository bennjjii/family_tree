const EditDelete = (props) => {
  return (
    <div className={"edit-delete"}>
      <button
        className="edit-button"
        uuid={props.uuid}
        onClick={props.handleUpd}
      >
        <i className="far fa-edit"></i>
      </button>
      {!props.onlyEdit && (
        <button
          className="delete-button"
          uuid={props.uuid}
          onClick={props.handleUpd}
        >
          <i className="far fa-trash-alt"></i>
        </button>
      )}
    </div>
  );
};

export default EditDelete;

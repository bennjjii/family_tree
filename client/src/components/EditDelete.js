const EditDelete = (props) => {
  return (
    <div className={"edit-delete"}>
      <i name={props.uuid} onClick={props.edit} className="far fa-edit"></i>
      {!props.onlyEdit && (
        <i
          name={props.uuid}
          onClick={props.delete}
          className="far fa-trash-alt"
        ></i>
      )}
    </div>
  );
};

export default EditDelete;

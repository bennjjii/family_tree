const FamilyMemberImage = (props) => {
  return (
    <div className="family-member-image">
      <img src={props.src} alt="photograph" />
      {process.env.REACT_APP_POO}
      <form action="/profile" method="post" enctype="multipart/form-data">
        <input type="file" name="avatar" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default FamilyMemberImage;

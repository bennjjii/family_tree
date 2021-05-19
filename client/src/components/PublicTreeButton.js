import harold from "./harold.png";

const PublicTreeButton = (props) => {
  const style = {
    textAlign: "centre",
    maxWidth: "70px",
  };
  const imgStyle = {
    width: "60px",
    height: "60px",
  };
  return (
    <>
      <div style={style}>
        <img src={harold} style={imgStyle} />
        <h6>{props.familyTreeName}</h6>
      </div>
    </>
  );
};

export default PublicTreeButton;

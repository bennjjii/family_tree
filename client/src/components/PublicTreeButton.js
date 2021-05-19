import harold from "./harold.png";

const PublicTreeButton = (props) => {
  const imgStyle = {
    width: "60px",
    height: "60px",
  };
  return (
    <>
      <button className="public-tree-button">
        <img src={harold} style={imgStyle} />
        <h6>{props.familyTreeName}</h6>
      </button>
    </>
  );
};

export default PublicTreeButton;

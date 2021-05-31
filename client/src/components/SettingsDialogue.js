import { useState, useEffect } from "react";

const SettingsDialogue = (props) => {
  const [formData, setFormData] = useState({
    isPublic: undefined,
    publicName: undefined,
  });

  useEffect(() => {
    setFormData({
      isPublic: props.isPublic,
      publicName: props.publicName,
    });
    console.log(props);
  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setSettings(formData);
  };

  return (
    <div className="idcard-form translucent-card">
      <form onSubmit={handleSubmit}>
        <h3>Settings</h3>
        <label>
          <input
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={(e) => {
              setFormData({
                ...formData,
                isPublic: e.target.checked,
              });
            }}
          />{" "}
          Make this family tree public?
        </label>
        <label>
          Unique name <br />
          <input
            type="text"
            name="publicName"
            value={formData.publicName}
            onChange={(e) => {
              setFormData({
                ...formData,
                publicName: e.target.value,
              });
            }}
          ></input>
        </label>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default SettingsDialogue;

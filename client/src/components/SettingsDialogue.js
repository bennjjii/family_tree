import { useState } from "react";

const SettingsDialogue = (props) => {
  const [formData, setFormData] = useState({
    isPublic: undefined,
    publicName: undefined,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateSettings(formData);
  };

  return (
    <div className="settings-dialogue">
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
                isPublic: !e.target.checked,
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
          ></input>
        </label>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default SettingsDialogue;

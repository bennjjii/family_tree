import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import FormError from "./FormError";

const SettingsDialogue = (props) => {
  const { register, handleSubmit, formState, control, setValue, setError } =
    useForm();

  const [formData, setFormData] = useState({
    isPublic: undefined,
    //publicName: undefined,
  });

  useEffect(() => {
    setFormData({
      isPublic: props.isPublic,
      //publicName: props.publicName,
    });
    setValue("publicName", props.publicName);
    console.log(props);
  }, [props]);

  const handleSubmit2 = (e) => {
    e.preventDefault();
    try {
      props.setSettings(formData);
    } catch (err) {
      setError("isPublic");
    }
  };

  const onSubmit = async (data) => {
    try {
      await props.setSettings({
        ...formData,
        publicName: formData.isPublic ? data.publicName : null,
      });
    } catch (err) {
      console.log(err);
      setError("publicName", { type: "manual", message: "name already taken" });
    }
  };

  console.log(formState.errors);

  return (
    <div className="idcard-form translucent-card">
      <button className="cancel-button" onClick={() => props.cancel()}>
        <i className="fas fa-times" />
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <div style={{ position: "relative" }}>
            <input
              {...register("publicName")}
              type="text"
              disabled={!formData.isPublic}
            />
            {formState.errors.publicName && (
              <FormError message="name already taken" />
            )}
          </div>
        </label>
        <input type="submit" value="Save" className="bubble-button" />
      </form>
    </div>
  );
};

export default SettingsDialogue;

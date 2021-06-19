import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormError from "./FormError";

const SettingsDialogue = (props) => {
  const { register, handleSubmit, formState, setValue, setError } = useForm();

  const [formData, setFormData] = useState({
    isPublic: undefined,
  });

  useEffect(() => {
    setFormData({
      isPublic: props.isPublic,
    });
    setValue("publicName", props.publicName);
    console.log(props);
  }, [props]);

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
              {...register("publicName", {
                validate: (v) => {
                  if (formData.isPublic) {
                    return !!v;
                  } else {
                    return true;
                  }
                },
                pattern: /^[a-zA-Z0-9]*$/g,
              })}
              type="text"
              disabled={!formData.isPublic}
            />
            {formState.errors.publicName &&
              formState.errors.publicName.type === "manual" && (
                <FormError message="name already taken" />
              )}
            {formState.errors.publicName &&
              formState.errors.publicName.type === "validate" && (
                <FormError message="please enter a name" />
              )}
            {formState.errors.publicName &&
              formState.errors.publicName.type === "pattern" && (
                <FormError message="please avoid entering spaces" />
              )}
          </div>
        </label>
        <input type="submit" value="Save" className="bubble-button" />
      </form>
    </div>
  );
};

export default SettingsDialogue;

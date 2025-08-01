import { Input } from "antd";
const { TextArea } = Input;

const options = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const AdditionalDetails = ({ userDetails, handleChange }) => {
  const { photoUrl, about, skills } = userDetails;
  return (
    <div>
      {" "}
      <div>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Photo Url</legend>
          <input
            value={photoUrl}
            onChange={(e) => handleChange("photoUrl", e.target.value)}
            type="text"
            className="input"
            placeholder="Type here"
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">About</legend>
          <textarea
            value={about}
            onChange={(e) => handleChange("about", e.target.value)}
            className="textarea"
            placeholder="Bio"
          ></textarea>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Skills</legend>
          <input
            value={skills}
            onChange={(e) => handleChange("skills", e.target.value)}
            type="text"
            className="input"
            placeholder="Type here"
          />
        </fieldset>
      </div>
    </div>
  );
};

export default AdditionalDetails;

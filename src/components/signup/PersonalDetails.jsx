import { Radio } from "antd";

const options = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const PersonalDetails = ({ userDetails, handleChange }) => {
  const { firstName, lastName, emailId, age, gender, password } = userDetails;
  return (
    <div>
      {" "}
      <div>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">First Name</legend>
          <input
            value={firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            type="text"
            className="input"
            placeholder="Type here"
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Last Name</legend>
          <input
            value={lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            type="text"
            className="input"
            placeholder="Type here"
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input
            value={emailId}
            onChange={(e) => handleChange("emailId", e.target.value)}
            type="text"
            className="input"
            placeholder="Type here"
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Age</legend>
          <input
            value={age}
            onChange={(e) => handleChange("age", e.target.value)}
            type="text"
            className="input"
            placeholder="Type here"
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Gender</legend>
          <Radio.Group
            block
            onChange={(e) => handleChange("gender", e.target.value)}
            value={gender}
            options={options}
            optionType="button"
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input
            value={password}
            onChange={(e) => handleChange("password", e.target.value)}
            type="text"
            className="input"
            placeholder="Type here"
          />
        </fieldset>
      </div>
    </div>
  );
};

export default PersonalDetails;

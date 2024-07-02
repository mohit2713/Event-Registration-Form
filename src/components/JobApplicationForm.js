import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
// import moment from "moment";

// Validation function
const validate = (values) => {
  let errors = {};
  if (!values.fullName) {
    errors.fullName = "Full Name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = "Phone Number is required";
  } else if (isNaN(values.phoneNumber)) {
    errors.phoneNumber = "Phone Number must be a valid number";
  }
  if (
    (values.applyingFor === "Developer" || values.applyingFor === "Designer") &&
    (!values.relevantExperience || values.relevantExperience <= 0)
  ) {
    errors.relevantExperience =
      "Relevant Experience is required and must be a number greater than 0";
  }
  if (
    values.applyingFor === "Designer" &&
    (!values.portfolioURL || !/^https?:\/\/.*\..*/i.test(values.portfolioURL))
  ) {
    errors.portfolioURL = "Portfolio URL is required and must be a valid URL";
  }
  if (values.applyingFor === "Manager" && !values.managementExperience) {
    errors.managementExperience = "Management Experience is required";
  }
  if (
    !values.additionalSkills.javascript &&
    !values.additionalSkills.css &&
    !values.additionalSkills.python
  ) {
    errors.additionalSkills = "At least one skill must be selected";
  }
  if (!values.preferredInterviewTime) {
    errors.preferredInterviewTime = "Preferred Interview Time is required";
  }
  return errors;
};

// Job Application Form Component
const JobApplicationForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(isSubmitting);

  // Custom hook for form validation
  const useForm = (initialValues, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    console.log(Object.keys(errors).length);
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      if (type === "checkbox") {
        setValues({
          ...values,
          additionalSkills: {
            ...values.additionalSkills,
            [name.split(".")[1]]: checked,
          },
        });
      } else {
        setValues({
          ...values,
          [name]: value,
        });
      }
    };

    const handleDateChange = (date) => {
      setValues({
        ...values,
        preferredInterviewTime: date,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const validationErrors = validate(values);
      setErrors(validationErrors);
      setIsSubmitting(true);
    };

    useEffect(() => {
      if (isSubmitting && Object.keys(errors).length === 0) {
        console.log("Form submitted successfully", values);
        // setIsSubmitting(false);
      }
    }, [errors]);

    return { values, errors, handleChange, handleSubmit, handleDateChange };
  };
  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    applyingFor: "",
    relevantExperience: "",
    portfolioURL: "",
    managementExperience: "",
    additionalSkills: {
      javascript: false,
      css: false,
      python: false,
    },
    preferredInterviewTime: null,
  };

  const { values, errors, handleChange, handleSubmit, handleDateChange } =
    useForm(initialValues, validate);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Job Application Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-2">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
          )}
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-2">
            Applying for Position
          </label>
          <select
            name="applyingFor"
            value={values.applyingFor}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          >
            <option value="">Select a position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        {(values.applyingFor === "Developer" ||
          values.applyingFor === "Designer") && (
          <div className="form-group">
            <label className="block text-gray-700 mb-2">
              Relevant Experience (in years)
            </label>
            <input
              type="number"
              name="relevantExperience"
              value={values.relevantExperience}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
            {errors.relevantExperience && (
              <p className="text-red-500 text-sm">
                {errors.relevantExperience}
              </p>
            )}
          </div>
        )}

        {values.applyingFor === "Designer" && (
          <div className="form-group">
            <label className="block text-gray-700 mb-2">Portfolio URL</label>
            <input
              type="text"
              name="portfolioURL"
              value={values.portfolioURL}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
            {errors.portfolioURL && (
              <p className="text-red-500 text-sm">{errors.portfolioURL}</p>
            )}
          </div>
        )}

        {values.applyingFor === "Manager" && (
          <div className="form-group">
            <label className="block text-gray-700 mb-2">
              Management Experience
            </label>
            <input
              type="text"
              name="managementExperience"
              value={values.managementExperience}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
            {errors.managementExperience && (
              <p className="text-red-500 text-sm">
                {errors.managementExperience}
              </p>
            )}
          </div>
        )}

        <div className="form-group">
          <label className="block text-gray-700 mb-2">Additional Skills</label>
          <div className="space-y-2">
            <label className="block">
              <input
                type="checkbox"
                name="additionalSkills.javascript"
                checked={values.additionalSkills.javascript}
                onChange={handleChange}
                className="mr-2"
              />
              JavaScript
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="additionalSkills.css"
                checked={values.additionalSkills.css}
                onChange={handleChange}
                className="mr-2"
              />
              CSS
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="additionalSkills.python"
                checked={values.additionalSkills.python}
                onChange={handleChange}
                className="mr-2"
              />
              Python
            </label>
          </div>
          {errors.additionalSkills && (
            <p className="text-red-500 text-sm">{errors.additionalSkills}</p>
          )}
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-2">
            Preferred Interview Time
          </label>
          <DatePicker
            selected={values.preferredInterviewTime}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
          {errors.preferredInterviewTime && (
            <p className="text-red-500 text-sm">
              {errors.preferredInterviewTime}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white p-3 rounded mt-4 hover:bg-indigo-600"
        >
          Submit
        </button>
      </form>

      {isSubmitting && Object.keys(errors).length === 0 && (
        <div className="mt-6 p-4 border border-green-500 text-green-700 bg-green-100 rounded">
          <h3 className="text-lg font-bold">Form Submitted Successfully!</h3>
          <pre className="mt-2">{JSON.stringify(values, null, 2)}</pre>
        </div>
      )}

      <div
        onClick={() => navigate("/")}
        className=" mt-20 w-[120px]  block border bg-gray-300  black-white py-2 px-4 rounded cursor-pointer"
      >
        Go Back To Home Page
      </div>
    </div>
  );
};

export default JobApplicationForm;

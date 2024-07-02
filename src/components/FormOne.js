import React, { useState, useEffect } from "react";

// Validation function
const validate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.age) {
    errors.age = "Age is required";
  } else if (isNaN(values.age) || values.age <= 0) {
    errors.age = "Age must be a number greater than 0";
  }
  if (values.attendingWithGuest === "yes" && !values.guestName) {
    errors.guestName = "Guest Name is required";
  }
  return errors;
};

// Event Registration Form Component
const EventRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Custom hook for form validation
  const useForm = (initialValues, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
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
      }
    }, [errors]);

    return { values, errors, handleChange, handleSubmit };
  };

  const initialValues = {
    name: "",
    email: "",
    age: "",
    attendingWithGuest: "no",
    guestName: "",
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validate
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Event Registration Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="form-group">
          <label className="block mb-2">Age</label>
          <input
            type="number"
            name="age"
            value={values.age}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>

        <div className="form-group">
          <label className="block mb-2">Are you attending with a guest?</label>
          <select
            name="attendingWithGuest"
            value={values.attendingWithGuest}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {values.attendingWithGuest === "yes" && (
          <div className="form-group">
            <label className="block mb-2">Guest Name</label>
            <input
              type="text"
              name="guestName"
              value={values.guestName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.guestName && (
              <p className="text-red-500 text-sm">{errors.guestName}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

      {isSubmitting && Object.keys(errors).length === 0 && (
        <div className="form-summary mt-4 p-4 border border-green-500 bg-green-100 rounded">
          <h3 className="text-lg font-semibold mb-2">
            Form Submitted Successfully
          </h3>
          <p>
            <strong>Name:</strong> {values.name}
          </p>
          <p>
            <strong>Email:</strong> {values.email}
          </p>
          <p>
            <strong>Age:</strong> {values.age}
          </p>
          <p>
            <strong>Attending with Guest:</strong> {values.attendingWithGuest}
          </p>
          {values.attendingWithGuest === "yes" && (
            <p>
              <strong>Guest Name:</strong> {values.guestName}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default EventRegistrationForm;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

const RegistrationForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState<String | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const validateForm = (): boolean => {
    const { firstName, lastName, email, password, phone } = formValues;
    if (!firstName || !lastName || !email || !password || !phone) {
      setError("we need all the fields");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("please add a correct email");
      return false;
    }
    if (password.length < 6) {
      setError("password must be more than 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setError(null);
    setIsSubmiting(true);

    try {
      await axios.post("http://localhost:5000/users", {
        ...formValues,
        registrationDate: new Date(),
      });
      navigate("/users");
    } catch (err) {
      setError("registration fails");
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold">Register</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="input-field"
          value={formValues.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="input-field"
          value={formValues.lastName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input-field"
          value={formValues.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-field"
          value={formValues.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="input-field"
          value={formValues.phone}
          onChange={handleChange}
        />
        <button type="submit" className="btn-primary" disabled={isSubmiting}>
          {isSubmiting ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;

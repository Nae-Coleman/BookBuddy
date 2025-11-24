import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = ({ authenticate }) => {
  const navigate = useNavigate();

  const register = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const newUser = {
      email,
      password,
    };

    try {
      const { data } = await axios.post(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
        newUser
      );

      // Save token
      window.localStorage.setItem("token", data.token);

      // Call authenticate() from App.jsx (teacher style)
      authenticate();

      // Go to Account page
      navigate("/account");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Could not register. Try again.");
    }
  };

  return (
    <form action={register}>
      <h2>Register</h2>

      <label>
        Email:
        <input type="email" name="email" required />
      </label>

      <label>
        Password:
        <input type="password" name="password" required />
      </label>

      <button type="submit">Create Account</button>
    </form>
  );
};

export default Register;

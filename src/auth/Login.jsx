import axios from "axios";
import { useNavigate } from "react-router";

const Login = ({ authenticate }) => {
  const navigate = useNavigate();

  // This function runs when the <form> is submitted
  const login = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const user = {
      email,
      password,
    };

    try {
      // SEND login request to Book Buddy API
      const { data } = await axios.post(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
        user
      );

      console.log("LOGIN RESPONSE:", data);

      // Save token in browser
      window.localStorage.setItem("token", data.token);

      // Let context fetch user info
      authenticate();

      // Send user to their account page
      navigate("/account");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form action={login}>
      <h2>Login</h2>

      <label>
        Email:
        <input type="email" name="email" />
      </label>

      <label>
        Password:
        <input type="password" name="password" />
      </label>

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

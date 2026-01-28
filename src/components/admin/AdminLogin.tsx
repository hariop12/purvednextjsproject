import { useState } from "react";
import { account } from "../../lib/appwrite";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      // ✅ CORRECT METHOD
      await account.createEmailPasswordSession(email, password);

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-box">
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="admin-button" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;

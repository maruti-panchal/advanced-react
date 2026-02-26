// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signupUser } from "../../utils/authApi.ts";

// export default function Signup() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     name: "",
//     address: "",
//   });

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     try {
//       const response = await signupUser(formData);

//       if (response.success) {
//         alert(response.message);
//         navigate("/login");
//       }
//     } catch (error) {
//       alert("Signup failed");
//     }
//   }

//   return (
//     <div className="auth-container">
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Name</label>
//         <input
//           required
//           onChange={(e) =>
//             setFormData({ ...formData, name: e.target.value })
//           }
//         />

//         <label>Email</label>
//         <input
//           type="email"
//           required
//           onChange={(e) =>
//             setFormData({ ...formData, email: e.target.value })
//           }
//         />

//         <label>Password</label>
//         <input
//           type="password"
//           required
//           onChange={(e) =>
//             setFormData({ ...formData, password: e.target.value })
//           }
//         />

//         <label>Address</label>
//         <input
//           required
//           onChange={(e) =>
//             setFormData({ ...formData, address: e.target.value })
//           }
//         />

//         <button type="submit">Create Account</button>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../utils/authApi.ts";

const GOOGLE_OAUTH_URL =
  "http://localhost:8080/oauth2/authorization/google";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await signupUser(formData);

      if (response.success) {
        alert(response.message);
        navigate("/login");
      }
    } catch (error) {
      alert("Signup failed");
    }
  }

  function handleGoogleSignup() {
    window.location.href = GOOGLE_OAUTH_URL;
  }

  return (
    <div className="auth-container">
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          required
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <label>Email</label>
        <input
          type="email"
          required
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <label>Password</label>
        <input
          type="password"
          required
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <label>Address</label>
        <input
          required
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />

        <button type="submit">Create Account</button>
      </form>

      {/* Google OAuth Button */}
      <button
        className="oauth-google-btn"
        onClick={handleGoogleSignup}
      >
        <span className="google-logo-circle">
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.67 1.22 9.16 3.6l6.83-6.83C35.9 2.36 30.37 0 24 0 14.61 0 6.27 5.48 2.69 13.44l7.98 6.19C12.49 13.23 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.14 24.55c0-1.66-.15-3.26-.43-4.8H24v9.08h12.4c-.54 2.92-2.16 5.4-4.6 7.07l7.14 5.56C43.86 37.07 46.14 31.34 46.14 24.55z"/>
            <path fill="#FBBC05" d="M10.67 28.62a14.6 14.6 0 010-9.24l-7.98-6.19A23.99 23.99 0 000 24c0 3.77.9 7.33 2.69 10.56l7.98-6.19z"/>
            <path fill="#34A853" d="M24 48c6.37 0 11.9-2.1 15.86-5.72l-7.14-5.56c-2 1.34-4.56 2.14-8.72 2.14-6.26 0-11.51-3.73-13.33-9.13l-7.98 6.19C6.27 42.52 14.61 48 24 48z"/>
          </svg>
        </span>
        Continue with Google
      </button>
    </div>
  );
}
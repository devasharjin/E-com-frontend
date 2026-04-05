import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const [preview, setPreview] = useState("");
  const [avatar, setAvatar] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    console.log({ ...user, avatar });
    toast.success("Registered successfully 🚀");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      
      <div className="w-full max-w-md bg-white border border-blue-100 rounded-xl p-8">
        
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700">
            Create account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Start your journey with us
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name */}
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />

          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-blue-200 overflow-hidden flex items-center justify-center bg-blue-50 text-blue-400 text-xs">
              {preview ? (
                <img
                  src={preview}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                "Upload"
              )}
            </div>

            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              className="text-sm text-gray-600"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
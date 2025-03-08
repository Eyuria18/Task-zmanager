import { UserLogin } from "../interfaces/UserLogin";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/auth"; // Ensure VITE_API_URL is set in your `.env` file

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch(`/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    return data.token; // Return the JWT token
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export { login };

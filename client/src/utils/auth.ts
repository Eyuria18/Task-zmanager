import { JwtPayload, jwtDecode } from "jwt-decode";

class AuthService {
  // ✅ Get decoded user profile from JWT
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload & { username: string }>(token) : null;
  }

  // ✅ Check if user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // ✅ Check if the token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return false; // If no expiry claim, assume valid

      return decoded.exp * 1000 < Date.now(); // Convert to milliseconds
    } catch (error) {
      return true; // If error occurs, assume token is invalid/expired
    }
  }

  // ✅ Retrieve the JWT from localStorage
  getToken(): string | null {
    return localStorage.getItem("token");
  }

  // ✅ Store JWT in localStorage and redirect to homepage
  login(idToken: string) {
    localStorage.setItem("token", idToken);
    window.location.assign("/"); // Redirect to homepage
  }

  // ✅ Remove JWT from localStorage and redirect to login
  logout() {
    localStorage.removeItem("token");
    window.location.assign("/login"); // Redirect to login page
  }
}

export default new AuthService();

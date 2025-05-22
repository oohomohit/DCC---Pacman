import { useNavigate } from "react-router-dom";

// Custom hook to handle reliable navigation
export const useAppNavigation = () => {
  const navigate = useNavigate();

  // Function to navigate to the login page
  const goToLogin = () => {
    try {
      // Log the navigation attempt
      console.log("Navigating to login page");
      
      // Main navigation approach
      navigate("/", { replace: true });
      
      // Fallback with direct URL change
      setTimeout(() => {
        if (window.location.pathname !== "/") {
          console.log("Fallback navigation to login");
          window.location.href = "/";
        }
      }, 200);
    } catch (error) {
      console.error("Navigation error:", error);
      window.location.href = "/";
    }
  };

  // Function to navigate to the register page
  const goToRegister = () => {
    try {
      // Log the navigation attempt
      console.log("Navigating to register page");
      
      // Main navigation approach
      navigate("/register", { replace: true });
      
      // Fallback with direct URL change
      setTimeout(() => {
        if (window.location.pathname !== "/register") {
          console.log("Fallback navigation to register");
          window.location.href = "/register";
        }
      }, 200);
    } catch (error) {
      console.error("Navigation error:", error);
      window.location.href = "/register";
    }
  };

  // Function to navigate to other pages
  const goToPage = (path) => {
    try {
      console.log(`Navigating to ${path}`);
      navigate(path, { replace: true });
      
      setTimeout(() => {
        if (window.location.pathname !== path) {
          console.log(`Fallback navigation to ${path}`);
          window.location.href = path;
        }
      }, 200);
    } catch (error) {
      console.error("Navigation error:", error);
      window.location.href = path;
    }
  };

  return {
    goToLogin,
    goToRegister,
    goToPage
  };
};

export default useAppNavigation; 
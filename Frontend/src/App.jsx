import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import StartScreen from "../pages/StartScreen";
import MazePage from "../pages/MazePage";
import FinishScreen from "../pages/FinishScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import GlobalHeader from "./components/GlobalHeader";

const AuthenticatedLayout = ({ children }) => {
  return (
    <>
      <GlobalHeader />
      {children}
    </>
  );
};

function App() {
  console.log("App rendering, routes should include /register");
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/start" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <StartScreen />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        <Route path="/mazepage" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <MazePage />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        <Route path="/result" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <FinishScreen />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        {/* Fallback route for direct access to /register */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;

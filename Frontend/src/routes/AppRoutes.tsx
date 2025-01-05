import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { AuthScreen } from "../components/sections/AuthScreen";
import { useAccount } from "wagmi";

const AppRoutes = () => {
  const { isConnected } = useAccount();

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isConnected ? <AuthScreen /> : <Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

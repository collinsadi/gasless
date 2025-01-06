import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { AuthScreen } from "../components/sections/AuthScreen";
import { useAccount } from "wagmi";
import { Faucet } from "../pages/Home/Faucet";

const AppRoutes = () => {
  const { isConnected } = useAccount();

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isConnected ? <AuthScreen /> : <Home />} />
        <Route path="/faucet" element={isConnected ? <Faucet /> : <AuthScreen />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

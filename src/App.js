import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Archive from "./pages/Archive";
import Header from "./components/ui/header/Header";
import ActivityDetails from "./components/details_card/ActivityDetails";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/activity/:id" element={<ActivityDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

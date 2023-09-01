import "./App.css";
import { BrowserRouter as Router,
         Routes, 
         Route } from "react-router-dom";
import Login from "./components/Login/login";
import Dashboard from "./components/dashboard/dashboard";
import AddEmployee from "./components/addEmployee/addEmployee";
import EditEmployee from "./components/EditEmployee/editEmployee";
function App() {
  return (
    <div>
      {/* Creating Router  */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path={`/editemployee/:id`} element={<EditEmployee />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;

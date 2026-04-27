// App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Admin from "./Admin";
import Users from "./Users";
import Profile from "./Profile";
import Edit from "./Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
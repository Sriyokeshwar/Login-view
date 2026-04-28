// App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Admin from "./Admin";
import Users from "./Users";
import Profile from "./Profile";
import Edit from "./Edit";
import AdminEdit from "./AdminEdit";
import Login from "./Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-edit/:id" element={<AdminEdit />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
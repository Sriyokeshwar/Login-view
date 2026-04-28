// Users.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Pencil,
  Trash2,
  Users as UsersIcon,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/users"
    );
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    const ok = window.confirm(
      "Delete this user?"
    );

    if (!ok) return;

    await axios.delete(
      `http://localhost:5000/api/user-delete/${id}`
    );

    fetchUsers();
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#eef2ff] via-[#dbeafe] to-[#c7d2fe] px-6 py-10 relative overflow-hidden">

      <div className="absolute w-80 h-80 bg-blue-400/20 rounded-full blur-3xl top-0 left-0"></div>
      <div className="absolute w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto bg-white/35 backdrop-blur-3xl border border-white/50 rounded-[34px] p-10 shadow-xl">

        <div className="absolute inset-0 rounded-[34px] bg-linear-to-br from-white/40 via-transparent to-blue-200/20 pointer-events-none"></div>

        <div className="relative z-10">

          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() =>
                navigate("/admin")
              }
              className="flex items-center gap-2 text-blue-700 font-semibold"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/40">
              <UsersIcon
                size={18}
                className="text-blue-700"
              />
              <span className="font-semibold">
                {users.length} Users
              </span>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-500/15 flex items-center justify-center">
              <Shield
                size={28}
                className="text-blue-700"
              />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-center mb-3">
            All Users
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Secure user management panel
          </p>

          <div className="overflow-x-auto rounded-3xl">
            <table className="w-full">
              <thead>
                <tr className="bg-white/50 text-left">
                  <th className="p-4">
                    No
                  </th>
                  <th className="p-4">
                    Name
                  </th>
                  <th className="p-4">
                    Email
                  </th>
                  <th className="p-4 text-center ">
                    Edit
                  </th>
                  <th className="p-4 text-center">
                    Delete
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map(
                  (user, index) => (
                    <tr
                      key={user._id}
                      className="border-b border-white/30 hover:bg-white/20"
                    >
                      <td className="p-4">
                        {index + 1}
                      </td>

                      <td className="p-4 font-medium">
                        {user.name}
                      </td>

                      <td className="p-4">
                        {user.email}
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() =>
                            navigate(`/admin-edit/${user._id}`)
                          }
                          className="group p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                        >
                          <Pencil
                            size={20}
                            className="text-blue-700 group-hover:text-blue-900 transition-colors duration-300"
                          />
                        </button>
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() =>
                            deleteUser(user._id)
                          }
                          className="group p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                        >
                          <Trash2
                            size={20}
                            className="text-red-600 group-hover:text-red-800 transition-colors duration-300"
                          />
                        </button>
                      </td>
                    </tr>
                  )
                )}

                {users.length ===
                  0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-gray-500"
                    >
                      No Users Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Users;
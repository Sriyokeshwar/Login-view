// Users.jsx - Golden Liquid Glass Theme

import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/user-delete/${id}`);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#fff8e1] via-[#fef3c7] to-[#fde68a] flex items-center justify-center px-6 py-10 relative overflow-hidden">

      {/* Background Liquid Blur */}
      <div className="absolute w-80 h-80 bg-yellow-300/30 rounded-full blur-3xl top-0 left-0"></div>
      <div className="absolute w-80 h-80 bg-amber-400/25 rounded-full blur-3xl bottom-0 right-0"></div>
      <div className="absolute w-72 h-72 bg-white/40 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      <div
        className="relative z-10 w-full max-w-6xl 
        bg-white/35 backdrop-blur-3xl 
        border border-white/50 
        rounded-[34px] 
        shadow-[0_8px_40px_rgba(255,190,0,0.22)] 
        p-10"
      >
        {/* Shine */}
        <div className="absolute inset-0 rounded-[34px] bg-linear-to-br from-white/40 via-transparent to-yellow-200/20 pointer-events-none"></div>

        <div className="relative z-10">
          <p className="text-xs font-semibold tracking-[4px] text-amber-700 uppercase text-center mb-4">
            User Overview
          </p>

          <h1 className="text-5xl font-bold text-gray-900 text-center mb-3">
            All Users
          </h1>

          <p className="text-gray-600 text-center mb-8">
            Premium user management dashboard
          </p>

          <div className="overflow-x-auto rounded-3xl">
            <table className="w-full overflow-hidden rounded-3xl">
              <thead>
                <tr className="bg-white/50 backdrop-blur-xl text-gray-900">
                  <th className="p-4 text-left">No</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-center">Edit</th>
                  <th className="p-4 text-center">Delete</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-b border-white/30 hover:bg-white/25 transition"
                  >
                    <td className="p-4 text-gray-800">
                      {index + 1}
                    </td>

                    <td className="p-4 font-medium text-gray-900">
                      {user.name}
                    </td>

                    <td className="p-4 text-gray-700">
                      {user.email}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() =>
                          navigate(`/edit/${user._id}`)
                        }
                        className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 transition hover:scale-110"
                      >
                        <Pencil
                          size={22}
                          color="blue"
                          strokeWidth={1.8}
                        />
                      </button>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() =>
                          deleteUser(user._id)
                        }
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition hover:scale-110"
                      >
                        <Trash2
                          size={22}
                          color="red"
                          strokeWidth={1.8}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
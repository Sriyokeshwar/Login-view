// Users.jsx

import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

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

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-stone-400 via-amber-400 to-gray-400 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-[#f8f7f4] rounded-3xl shadow-2xl border border-gray-200 p-10">
        <p className="text-xs font-semibold tracking-[4px] text-yellow-700 uppercase text-center mb-4">
          User Overview
        </p>

        <h1 className="text-5xl font-bold text-gray-900 text-center mb-3">
          All Users
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Overall registered users data
        </p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-yellow-500 text-black">
                <th className="p-4 text-left">No</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 hover:bg-yellow-50"
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
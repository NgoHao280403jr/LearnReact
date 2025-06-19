// ✅ src/pages/Home.jsx
import { useAuth } from "@/contexts/AuthContext";
import UserTable from "@/components/UserTable";
import { useEffect, useState } from "react";
import { getUsers } from "@/services/userService";

export default function Home() {
  const { logout } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chào mừng bạn đến trang Home 🎉</h1>
      <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-6"
      >
        Đăng xuất
      </button>

      <UserTable users={users} />
    </div>
  );
}

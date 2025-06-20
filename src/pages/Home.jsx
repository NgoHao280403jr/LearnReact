import { useAuth } from "@/contexts/AuthContext";
import UserTable from "@/components/UserTable";
import UserDetailModal from "../components/UserDetailModal";
import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import EditUserModal from "../components/EditUserModal";
import { useToast } from "@/hooks/useToast";
export default function Home() {
  const { logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const { toast, showToast, hideToast } = useToast();
  useEffect(() => {
    const fetchUsers = async () => {
      const result = await userService.getUsers();
      if (result.success) {
        setUsers(result.data);
      } else {
        setError(result.error);
      }
    };
    fetchUsers();
  }, []);

  const handleSelectUser = async (userId) => {
    const result = await userService.getUserById(userId);
    if (result.success) {
      setSelectedUser(result.data);
    } else {
      setError(result.error);
    }
  };

  const closeModal = () => {
    setSelectedUser(null);
  };
  const handleSaveEdit = async (updatedUser) => {
    const result = await userService.updateUser(updatedUser.id, {
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      email: updatedUser.email,
    });

    if (result.success) {
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      setEditingUser(null);
      showToast("success", "Cập nhật thành công!");
    } else {
      showToast("error", "Lỗi cập nhật: " + result.error);
    }

    setTimeout(hideToast, 3000);
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá người dùng này?");
    if (!confirmDelete) return;

    const result = await userService.deleteUser(userId);
    if (result.success) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      showToast("success", "Xoá thành công!");
    } else {
      showToast("error", "Xoá thất bại: " + result.error);
    }

    setTimeout(hideToast, 3000);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chào mừng bạn đến trang Home 🎉</h1>

      <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-6"
      >
        Đăng xuất
      </button>

      {error && <div className="text-red-600 mb-4">⚠ {error}</div>}

      <UserTable
        users={users}
        onSelectUser={handleSelectUser}
        onEdit={(user) => setEditingUser(user)} // 👈 Bắt đầu sửa
        onDelete={handleDeleteUser}
      />

      <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />

      <EditUserModal
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleSaveEdit}
      />
      {/* ✅ Hiển thị toast ở đây */}
      {toast.isVisible && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-md text-white transition-all z-50
          ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

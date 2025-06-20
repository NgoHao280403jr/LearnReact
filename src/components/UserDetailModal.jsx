// ✅ src/components/UserDetailModal.jsx
export default function UserDetailModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-[90%] max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Chi tiết người dùng</h2>
        <div className="flex flex-col items-center gap-2">
          <img
            src={user.avatar}
            alt={user.first_name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <p className="font-bold">{user.first_name} {user.last_name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
    </div>
  );
}

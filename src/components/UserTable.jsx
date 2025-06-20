export default function UserTable({ users, onSelectUser, onEdit, onDelete }) {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
          <th className="px-4 py-2">Người dùng</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Avatar</th>
          <th className="px-4 py-2 text-center">Sửa / Xóa</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
        {users.map((user) => (
          <tr
            key={user.id}
            className="text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            onClick={() => onSelectUser?.(user.id)}
          >
            <td className="px-4 py-3 font-semibold">
              {user.first_name} {user.last_name}
            </td>
            <td className="px-4 py-3 text-sm">{user.email}</td>
            <td className="px-4 py-3">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={user.avatar}
                alt={user.first_name}
              />
            </td>            
            <td className="px-4 py-3 text-center">
              <button
                className="px-3 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation(); // Ngăn click lan lên row
                  onEdit?.(user);
                }}
                title="Sửa"
              >
                ✏️
              </button>
              <button
                className="px-3 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation(); // Ngăn click lan lên row
                  onDelete?.(user.id);
                }}
                title="Xoá"
              >
                🗑️
              </button>
            </td>                      
          </tr>
        ))}
      </tbody>
    </table>
  );
}

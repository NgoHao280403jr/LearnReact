import api from "./axios";
import { API_ENDPOINTS } from "../utils/constants";

export const userService = {
  getUsers: async (page = 1) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.GET_USERS}?page=${page}`);

      if (response.status === 200) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || "Lấy danh sách người dùng thành công",
        };
      } else {
        return {
          success: false,
          error: response.data.message || "Lấy danh sách người dùng thất bại",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Có lỗi xảy ra khi tải danh sách người dùng",
      };
    }
  },
  getUserById: async (id) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.GET_USERS}/${id}`);

      if (response.status === 200) {
        return {
          success: true,
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          error: response.data.message || "Không lấy được thông tin người dùng",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Lỗi khi lấy chi tiết người dùng",
      };
    }
  },
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
          message: "Cập nhật thành công",
        };
      } else {
        return {
          success: false,
          error: response.data?.message || "Cập nhật thất bại",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Có lỗi khi cập nhật",
      };
    }
  },
  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/users/${userId}`);
      if (response.status === 204) {
        return { success: true };
      } else {
        return { success: false, error: "Xoá thất bại" };
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Có lỗi xảy ra khi xoá người dùng",
      };
    }
  },
};

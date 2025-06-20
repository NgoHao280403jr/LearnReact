import api from "./axios";
import { API_ENDPOINTS } from '../utils/constants.js';

export const loginService = {
  login: async (email, password) => {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, { email, password });
      if (response.data.statusCode === 200 || response.data.token) {
        return {
          success: true,
          data: response.data.data || response.data, // Token hoặc user
          message: response.data.message || "Đăng nhập thành công",
        };
      } else {
        return {
          success: false,
          error: response.data.message || "Đăng nhập thất bại",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Có lỗi xảy ra khi đăng nhập",
      };
    }
  },
};
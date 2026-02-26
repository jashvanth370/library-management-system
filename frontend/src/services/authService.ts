import axios from "../utils/axiosInstance";

export const register = async (username: string, password: string) => {
  const response = await axios.post("/auth/register", {
    username,
    password,
  });

  return response.data;
};

export const login = async (username: string, password: string) => {
  const response = await axios.post("/auth/login", {
    username,
    password,
  });

  return response.data;
};
// services/users.service.ts

import api from "./api";  // pre configured axios instance

// get all users
export const getUsers = async () => {
  try {
    const res = await api.get('/users');
    return res.data.users;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message);
  }
};


// create new user
export const createUser = async (user: { name: string, age: Number, about:String }) => {
    const res = await api.post('/users',user);
    return res.data;
}
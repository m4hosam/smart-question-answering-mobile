import axios from "axios";
import { UserUpdate } from "../types/common.types";
// get all user Admin only
export async function getAllUsers(token: string) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // const err = error as AxiosError;
      // console.log(err.response?.data);
      return error.response;
    } else {
      console.log(error);
      throw error;
    }
  }
}

// get user by id Admin only
export async function getUserById(id: string, token: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // const err = error as AxiosError;
      // console.log(err.response?.data);
      return error.response;
    } else {
      console.log(error);
      throw error;
    }
  }
}

// update user {name,email,role} by id Admin only
export async function updateUserById(
  id: string,
  user: UserUpdate,
  token: string
) {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}user/${id}`,
      user,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // const err = error as AxiosError;
      // console.log(err.response?.data);
      return error.response;
    } else {
      console.log(error);
      throw error;
    }
  }
}

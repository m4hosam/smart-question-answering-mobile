import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
// import bcrypt from "bcryptjs";

export async function createUser(
  email: string,
  password: string,
  name: string
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}user`,
      {
        email: email,
        password: password,
        name: name,
      }
    );
    // console.log("createUser status: ", response.data.success)
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

export async function register(email: string, password: string, name: string) {
  try {
    const createdUserResponse = await createUser(email, password, name);
    console.log("createUserStatus: ", createdUserResponse);
    if (createdUserResponse?.status === 200) {
      // console.log("createUserStatus: ", createUserStatus?.success)
      console.log("createdUserResponse: ", createdUserResponse);
      // await AsyncStorage.setItem('token', createdUserResponse?.data?.token);
      // console.log("signInResponse.error: ", signInResponse?.error)
    } else {
      return createdUserResponse;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Authentication
export async function autherizeUser(email: string, password: string) {
  // password should be hashed before calling this function
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}user/login`,
      {
        email: email,
        password: password,
      }
    );
    console.log("autherize func: ", response.data);
    // returns user {email and name} if user autherized, empty object if not
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

export async function login(email: string, password: string) {
  try {
    const autherizedUserResponse = await autherizeUser(email, password);
    console.log("userAutherized login func: ", autherizedUserResponse);
    // if user autherized {user: {email, name}} else {user: {}},
    if (autherizedUserResponse?.status === 200) {
      console.log("autherizedUserResponse: ", autherizedUserResponse);
      // await AsyncStorage.setItem('token', autherizedUserResponse?.data?.token);
      // console.log("signInResponse.error: ", signInResponse?.error)
      return autherizedUserResponse;
    }
    // user not autherized wrong password or not registered
    else {
      return autherizedUserResponse;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUser(email: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}user/${email}`
    );
    // console.log("getuser: ", response.data)
    // returns true if user exists, false if not
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

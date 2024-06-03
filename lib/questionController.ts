import axios from "axios";

export async function createQuestion(userQuestion: {
  category: string;
  question: string;
  question_image: string;
  token: string;
}) {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}question`,
      userQuestion,
      {
        headers: {
          Authorization: `Bearer ${userQuestion.token}`,
        },
      }
    );
    // console.log("createUser status: ", response.data.success)
    // console.log(response);
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

export async function createQurestionFromImage(image: File, token: string) {
  try {
    const formData = new FormData();
    formData.append("image", image);
    // console.log("createQurestionFromImage: ", image);

    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}question/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        timeout: 70000, // Set the timeout to 70 seconds (in milliseconds)
      }
    );
    // console.log("createQurestionFromImage: ", token);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
      throw error;
    }
  }
}

export async function extractQuestionFromImage(imageUri: string) {
  try {
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg", // Ensure you specify the correct image type
      name: "photo.jpg",
    } as any);
    // console.log("createQurestionFromImage: ", image);

    const response = await axios
      .post(`${process.env.EXPO_PUBLIC_OCR_API_URL}image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 70000, // Set the timeout to 70 seconds (in milliseconds)
      })
      .then((response) => {
        // console.log("extractQurestionFromImage response: ", response.data);
        return response;
      })
      .catch((error) => {
        // console.log("extractQurestionFromImage error: ", error);
        return error;
      });
    // console.log("extractQurestionFromImage response: ");
    // console.log("extractQurestionFromImage response: ", response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
      throw error;
    }
  }
}

export async function getAllQuestions() {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}question`
    );
    // console.log("getAllQuestions: ", response?.data);
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

export async function getMyQuestions(token: string) {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}question/user`,
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

export async function getQuestionById(id: string) {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}question/${id}`
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

export async function getTeacherQuestions(token: string) {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}question/teacher`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("getTeacherQuestions: ", response?.data);
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

export async function deleteQuestion(id: string, token: string) {
  try {
    const response = await axios.delete(
      `${process.env.EXPO_PUBLIC_API_URL}question/${id}`,
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

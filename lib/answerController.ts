import axios from "axios";

export async function createAnswer(
  answer: {
    answer: string;
    answer_image?: string;
    question_id: string;
  },
  token: string
) {
  try {
    console.log(answer);
    console.log(token);

    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}answer`,
      answer,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

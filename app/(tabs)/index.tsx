import {
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  Alert,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import FeatureButton from "@/components/FeatureButton";
import { getAllQuestions } from "@/lib/questionController";
import { Question } from "@/types/common.types";
import * as ImagePicker from "expo-image-picker";
import {
  extractQuestionFromImage,
  createQuestion,
} from "@/lib/questionController";
import { cloudinary_upload } from "@/lib/cloudinary";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QuestionCard from "@/components/QuestionCard";

export default function HomeScreen() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string | null>(null);

  const fetchQuestions = async () => {
    try {
      const questionsResponse = await getAllQuestions();
      let questions: Question[] = [];
      if (questionsResponse?.status === 200) {
        setQuestions(questionsResponse.data);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert("Please select an image first");
      return;
    }

    setLoading(true);

    try {
      const extractionResponse = await extractQuestionFromImage(image);

      if (extractionResponse?.status !== 200) {
        Alert.alert("Error in extracting text.");
      } else {
        const cloudinaryResponse = await cloudinary_upload(image);

        const userQuestion = {
          ...extractionResponse?.data,
          question_image: cloudinaryResponse.url,
          token: await AsyncStorage.getItem("token"),
        };

        const questionResponse = await createQuestion(userQuestion);

        if (questionResponse?.status === 200) {
          Alert.alert("Question added successfully.");
          setImage(null);
          fetchQuestions(); // Refresh the questions feed
        } else if (questionResponse?.status === 409) {
          Alert.alert("Error saving question.");
          console.log(questionResponse.data.similarQuestions);
        } else if (questionResponse?.status === 403) {
          Alert.alert("Not authorized.");
        } else {
          Alert.alert("Error in saving question.");
        }
      }
    } catch (error) {
      console.error("Upload failed:", error);
      Alert.alert("Upload failed", (error as string) || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }
  // const questions = await getAllQuestions();
  // console.log(questions);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => router.push("/teacher")}
          className="flex flex-row items-center justify-center bg-green-400 rounded-lg p-2 m-5"
        >
          <FontAwesome name="user" size={24} color="black" />
          <Text className="ml-5">Go to Teacher</Text>
        </TouchableOpacity>
        <View style={styles.uploadContainer}>
          {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
          <TouchableOpacity
            onPress={pickImage}
            className="flex flex-row items-center justify-center bg-blue-400 rounded-lg w-[80%] p-3 m-5"
          >
            <Entypo name="upload-to-cloud" size={24} color="black" />
            <Text className="ml-5 text-lg">Upload an Image</Text>
          </TouchableOpacity>
          {image && (
            <>
              <Image source={{ uri: image }} style={styles.previewImage} />
              <View className=" flex flex-row items-center justify-between">
                <TouchableOpacity
                  onPress={uploadImage}
                  className="flex flex-row items-center justify-center bg-green-400 rounded-lg  py-2 px-5 mx-3"
                >
                  <Text className="">Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setImage(null)}
                  className="flex flex-row items-center justify-center bg-red-500 rounded-lg  py-2  px-5 mx-3"
                >
                  <Text className=" ">Clear</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        <View style={styles.questionsContainer}>
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  answerText: {
    fontSize: 14,
    color: "gray",
  },
  uploadContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginVertical: 10,
  },
});

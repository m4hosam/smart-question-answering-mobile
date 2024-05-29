import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface FeatureButtonProps {
  title: string;
  route: string;
  //   icon is react component
  icon: React.ReactNode;
}

const FeatureButton = ({ title, route, icon }: FeatureButtonProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(route)}
      className="w-36 h-36 p-5 bg-blue-300 m-2  flex flex-col items-center justify-center rounded-xl"
      // disabled={isLoading}
    >
      {/* <Entypo name="video" size={50} color="orange" /> */}
      {/* <Entypo name="game-controller" size={24} color="black" /> */}
      {icon}
      <Text className="text-lg font-bold text-center">{title}</Text>
    </TouchableOpacity>
  );
};

export default FeatureButton;

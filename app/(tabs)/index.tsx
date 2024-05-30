import {
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import FeatureButton from "@/components/FeatureButton";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className=" h-full">
      <ScrollView>
        <View
          className="w-full flex flex-row flex-wrap justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <FeatureButton
            title="Sign in"
            route="/sign-in"
            icon={<Entypo name="game-controller" size={35} color="black" />}
          />
          <FeatureButton
            title="Sign-up"
            route="/sign-up"
            icon={<FontAwesome name="music" size={35} color="black" />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

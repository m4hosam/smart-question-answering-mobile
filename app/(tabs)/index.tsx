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
            title="Memory Game"
            route="/memory-game"
            icon={<Entypo name="game-controller" size={35} color="black" />}
          />
          <FeatureButton
            title="Audio"
            route="/audio"
            icon={<FontAwesome name="music" size={35} color="black" />}
          />
          <FeatureButton
            title="Videos"
            route="/video-skills"
            icon={<Entypo name="video" size={35} color="black" />}
          />
          <FeatureButton
            title="Medication"
            route="/medication"
            icon={<AntDesign name="medicinebox" size={35} color="black" />}
          />
          <FeatureButton
            title="Heart"
            route="/heart"
            icon={<FontAwesome name="heartbeat" size={24} color="black" />}
          />
          <FeatureButton
            title="Location"
            route="/location"
            icon={<Entypo name="location-pin" size={24} color="black" />}
          />

          {/* <Link className="bg-blue-300 text-2xl text-center" href="/test">
            d
          </Link>
          <Button
            title="Memory Game"
            onPress={() => router.push("/memory-game")}
          />
          <Button title="Audio" onPress={() => router.push("/audio")} />
          <Button
            title="Manual Skill"
            onPress={() => router.push("/video-skills")}
          />
          <Button
            title="Medication"
            onPress={() => router.push("/medication")}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { View, Text, ImageBackground, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import beachImage from "../assets/meditation-images/beach.webp";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import AppGradient from "@/components/AppGradient";

const App = () => {
  const router = useRouter();
  return (
    <View className="flex-1">
      <ImageBackground
        source={beachImage}
        className="flex-1"
        resizeMode="cover"
      >
        <AppGradient colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}>
          <SafeAreaView className="flex-1 mx-5 justify-around">
            <View>
              <Text className="text-center text-white font-bold text-4xl">
                Black Lotus
              </Text>
              <Text className="mt-5 text-center text-white font-bold text-2xl">
                Mediatation is medicine of mental peace
              </Text>
            </View>
            <View>
              <CustomButton
                onPress={() => router.push("/nature-meditate")}
                title="Get Started"
              />
            </View>
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
      <StatusBar />
    </View>
  );
};

export default App;

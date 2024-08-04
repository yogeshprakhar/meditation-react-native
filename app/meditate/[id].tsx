import { View, Text, ImageBackground, Pressable } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import meditationImages from "@/constants/meditation-images";
import AppGradient from "@/components/AppGradient";
import { router, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { Audio } from "expo-av";
import { AUDIO_FILES, MEDITATION_DATA } from "@/constants/MeditationData";
import { TimerContext } from "@/context/TimerContext";

const meditate = () => {
  const { id } = useLocalSearchParams();
  const { duration: secondRemaining, setDuration: setSecondRemaining } =
    useContext(TimerContext);
  // const [secondRemaining, setSecondRemaining] = useState(10);
  const [isMeditating, setIsmeditating] = useState(false);
  const [audioSound, setSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (secondRemaining === 0) {
      setIsmeditating(false);
      setIsPlayingAudio(false)
      return;
    }
    if (isMeditating) {
      timerId = setTimeout(() => {
        setSecondRemaining(secondRemaining - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [secondRemaining, isMeditating]);

  useEffect(() => {
    return () => {
      setSecondRemaining(10)
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  async function toggleMeditationSessionStatus() {
    if (secondRemaining === 0) setSecondRemaining(10);

    setIsmeditating(!isMeditating);

    await toggleSound();
  }

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
    setSound(sound);
    return sound;
  };

  const toggleSound = async () => {
    const sound = audioSound ? audioSound : await initializeSound();

    const status = await sound?.getStatusAsync();

    if (status?.isLoaded && !isPlayingAudio) {
      await sound.playAsync();
      setIsPlayingAudio(true);
    } else {
      await sound.pauseAsync();
      setIsPlayingAudio(false);
    }
  };

  const handleAdjustDuration = () => {
    if(isMeditating) toggleMeditationSessionStatus()

      router.push("/(modal)/adjust-meditation")
  }

  const formattedTimeMinutes = String(
    Math.floor(secondRemaining / 60)
  ).padStart(2, "0");
  const formattedTimeSeconds = String(secondRemaining % 60).padStart(2, "0");

  return (
    <View className="flex-1">
      <ImageBackground
        source={meditationImages[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
          <Pressable onPress={() => router.back()} className="mt-5">
            <AntDesign name="leftcircleo" size={50} color={"white"} />
          </Pressable>
          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="text-4xl text-blue-800 font-rmono">
                {formattedTimeMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
          </View>
          <View className="mb-5">
            <CustomButton
              title="Adjust Duration"
              onPress={handleAdjustDuration}
            />
            <CustomButton
              containerStyles="mt-4"
              title={isMeditating ? "Stop Meditating" : "Start Meditating"}
              onPress={toggleMeditationSessionStatus}
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default meditate;

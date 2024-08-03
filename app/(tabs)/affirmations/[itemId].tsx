import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { GalleryPreviewData } from "@/constants/models/AffirmationCategory";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallary";
import AppGradient from "@/components/AppGradient";
import { AntDesign } from "@expo/vector-icons";
const AfirmationPractice = () => {
  const { itemId } = useLocalSearchParams();
  const [affirmation, setAffirmation] = useState<GalleryPreviewData>();
  const [sentence, setSentence] = useState<String[]>([])
  useEffect(() => {
    for (let index = 0; index < AFFIRMATION_GALLERY.length; index++) {
      const affirmationData = AFFIRMATION_GALLERY[index].data;
      const affirmationToStart = affirmationData.find(
        (a) => a.id === Number(itemId)
      );

      if (affirmationToStart) {
        setAffirmation(affirmationToStart);
        const affirmationArray = affirmationToStart.text.split(".")
        if(affirmationArray[affirmationArray.length-1] === ""){
              affirmationArray.pop()
        }
        setSentence(affirmationArray)
        return;
      }
    }
  }, []);
  return (
    <View className="flex-1">
      <ImageBackground
        source={affirmation?.image}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.9)"]}>
          <Pressable
            className="mt-5"
            onPress={() => router.back()}
          >
            <AntDesign name="leftcircleo" size={50} color={"white"} />
          </Pressable>
          <ScrollView className="mt-20" showsVerticalScrollIndicator={false}>
            <View className="h-full justify-center">
              <View className="h-4/5 justify-center">
                {sentence.map((sent, idx) => (
                  <Text
                    key={idx}
                    className=" text-violet-300 mb-12 text-3xl font-bold"
                  >
                    {sent}
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default AfirmationPractice;

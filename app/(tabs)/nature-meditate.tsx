import { View, Text, FlatList, Pressable, ImageBackground } from "react-native";
import React from "react";
import AppGradient from "@/components/AppGradient";
import { StatusBar } from "expo-status-bar";

import { MEDITATION_DATA } from "@/constants/MeditationData";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import { LinearGradient } from "expo-linear-gradient";

const NatureMeditate = () => {
  return (
    <View className="flex-1">
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <View className="mb-6">
          <Text className="text-gray-200 mb-3 font-bold text-4xl text-left">
            Welcome Steven
          </Text>
          <Text className="text-indigo-100 text-l font-medium">
            Start your meditation practice
          </Text>
        </View>
        <View>
          <FlatList
            data={MEDITATION_DATA}
            className="flex"
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                className="h-48 my-3 rounded-xl overflow-hidden"
                onPress={() => console.log("press")}
              >
                <ImageBackground
                  source={MEDITATION_IMAGES[item.id - 1]}
                  resizeMode="cover"
                  className="flex-1 justify-center"
                >
                  <LinearGradient
                    className="flex-1 justify-center item-center"
                    colors={["transparent", "rgba(0,0,0,9)"]}
                  >
                    <Text className="text-gray-100 text-3xl font-bold text-center">
                      {item.title}{" "}
                    </Text>
                  </LinearGradient>
                </ImageBackground>
              </Pressable>
            )}
          />
        </View>
      </AppGradient>
      {/* <StatusBar /> */}
    </View>
  );
};

export default NatureMeditate;

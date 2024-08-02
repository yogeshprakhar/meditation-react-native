import { StyleSheet } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient'

const AppGradient = ({children, colors}:{children:any, colors:string[]}) => {
  return (
    <LinearGradient colors={colors} className="flex-1">
      <SafeAreaView style={[styles.container]}>{children}</SafeAreaView>
    </LinearGradient>
  );
}

export default AppGradient

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20, // Approximate conversion of TailwindCSS px-5
    paddingVertical: 12, // Approximate conversion of TailwindCSS py-3
  },
});
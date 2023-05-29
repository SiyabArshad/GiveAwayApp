import React from "react";
import { Platform, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import colors from "../helpers/colors"
function Screen({ children, statusBarColor = colors.white, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      {Platform.OS === "android" ? <StatusBar backgroundColor={statusBarColor} barStyle="dark-content" /> : null}
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor:colors.white,
  },
});

export default Screen;
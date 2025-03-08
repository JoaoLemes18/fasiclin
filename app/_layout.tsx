import React from "react";
import { View } from "react-native";
import { Slot } from "expo-router";

const Layout = () => {
  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
};

export default Layout;

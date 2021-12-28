import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";

export const Ball = () => {
  const [position, setPosition] = useState(new Animated.ValueXY(0, 0));


  useEffect(() => {
    Animated.spring(position, {
      toValue: {
        x: 200,
        y: 500,
      },
      useNativeDriver: false, // Add This line
    }).start();
  }, []);
  
  return (
    <Animated.View style={position.getLayout()}>
      <View style={styles.ball} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 30,
  },
});

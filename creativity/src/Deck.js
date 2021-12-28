import React from "react";
import { View, Animated } from "react-native";

export const Deck = (props) => {
  renderCards=()=>
  {
    return props.data.map((item) => {
      return props.renderCard(item);
    });
  }

  return <View>{this.renderCards()}</View>;
};

import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  StyleSheet,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

export const Deck = (props) => {
  const position = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
        } else {
          resetPosition();
        }
      },
    })
  ).current;
  const [state, setState] = useState({ });

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }, []);

  useEffect(() => {
  
    setState({  index: 0 });
  }, [props]);

  const forceSwipe = (direction) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => onSwipeComplete(direction));
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
    }).start();
  };

  const onSwipeComplete = (direction) => {
    const { onSwipeLeft, onSwipeRight, data } = props;

    const item = data[state.index];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    setState({  index: state.index + 1 }); 
    position.setValue({ x: 0, y: 0 });
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return { ...position.getLayout(), transform: [{ rotate }] };
  };

  const renderCards = () => {
    console.log("stateee:",state)
    return props.data.map((item, i) => {
      if (i < state.index) {
        return null;
      }

      if (i === state.index) {
        return (
          <Animated.View
            {...panResponder.panHandlers}
            key={item.id}
            style={[getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
          >
            {props.renderCard(item)}
          </Animated.View>
        );
      }
      return (
        <Animated.View
          key={item.id}
          style={[styles.cardStyle, {  zIndex: 5 }]}
        >
          {props.renderCard(item)}
        </Animated.View>
      );
    }).reverse();
  };
  return <View>{renderCards()}</View>;
};

Deck.defaultProps = {
  onSwipeRight: () => {},
  onSwipeLeft: () => {}
};

const styles = StyleSheet.create({
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH,
  },
});

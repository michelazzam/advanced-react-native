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
        state.position.setValue({ x: gesture.dx, y: gesture.dy });
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
  const [state, setState] = useState({ position, panResponder });

  useEffect(() => {
    const addIndex = async () => {

      setState({ ...state, index: 0 });
    };
    addIndex();
  }, []);

  const forceSwipe = (direction) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => onSwipeComplete(direction));
  };

  const resetPosition = () => {
    Animated.spring(state.position, {
      toValue: { x: 0, y: 0 },
    }).start();
  };

  const onSwipeComplete = (direction) => {
    const { onSwipeLeft, onSwipeRight, data } = props;

    const item = data[state.index];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    setState({ ...state, index: state.index + 1 });
    state.position.setValue({ x: 0, y: 0 });

    console.log("done", state.index ,state);
  };

  const getCardStyle = () => {
    const rotate = state.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return { ...state.position.getLayout(), transform: [{ rotate }] };
  };

  const renderCards = () => {
    return props.data.map((item, i) => {
      if (i < state.index) {
        return null;
      }

      if (i === state.index) {
        return (
          <Animated.View
            {...state.panResponder.panHandlers}
            key={item.id}
            style={getCardStyle()}
          >
            {props.renderCard(item)}
          </Animated.View>
        );
      }
      return props.renderCard(item);
    });
  };
  return <View>{renderCards()}</View>;
};

Deck.defaultProps = {
  onSwipeRight: () => {},
  onSwipeLeft: () => {},
};

const styles = StyleSheet.create({
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH,
  },
});

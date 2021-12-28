- animation system:
  LayoutAnimation: not much control, good for basic animation such as straight from top to bottom animation
  Animated: for more controls and complicated animations

- 3 basic questions before animating any object:
  where is the item on the screen at any given time?
  where is the element moving to ?
  which element are we moving ?

- import {Animated} from 'react-native';
  Animated.Values.Animated >> javascript object that helps us find where the item is on the screen
  Animated.Types.Spring >> will help us to see how the element is changing it's position or color
  Animated.Components.View >> what element are we animating

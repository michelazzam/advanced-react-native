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


  Animated.timing >> has a linear animation view; just get there
  Animated.spring >> has a bouncy feeling 

-default props in react functional component:
  [function name].defaultProps = {
  ....
  }

  in class component:
  static defaultProps={
    ....
  }

-UIManager


- User Authentication app
   NEVER: user requests otp >> send device the token in http response >> text user the code (compare codes on user's device ) --- never do the token comparison on device level -- XXXXXX

   BETTER TO DO: user requests OTP >> Acknowledge request >> generate code, save code on backend (using firebase) >> text user a code (twilio) >> user send us correct code >> compare codes on the server >> send user a JWT(json web token) to identify them (firebase)

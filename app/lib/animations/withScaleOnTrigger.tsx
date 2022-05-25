import React from 'react';
import Animated, { Easing } from 'react-native-reanimated';

interface DotCodeProps {
  position: Animated.Value<number>;
  animatedTrigger: Animated.Value<0 | 1>;
  duration: number;
}

const { block, cond, clockRunning, stopClock, set, startClock, timing, not, neq, and } = Animated;

export class ScaleOnTrigger extends React.PureComponent<DotCodeProps> {
  clock = new Animated.Clock();

  springState = {
    finished: new Animated.Value(0),
    time: new Animated.Value(0),
    velocity: new Animated.Value(0),
    frameTime: new Animated.Value(0),
    position: this.props.position,
  };

  render() {
    const { animatedTrigger, duration } = this.props;
    return (
      <Animated.Code>
        {() =>
          block([
            cond(and(not(clockRunning(this.clock)), neq(this.springState.position, animatedTrigger)), [
              set(this.springState.time, 0),
              set(this.springState.frameTime, 0),
              startClock(this.clock),
            ]),
            timing(this.clock, this.springState, { toValue: animatedTrigger, duration, easing: Easing.linear }),
            cond(this.springState.finished, [stopClock(this.clock), set(this.springState.finished, 0)]),
          ])
        }
      </Animated.Code>
    );
  }
}

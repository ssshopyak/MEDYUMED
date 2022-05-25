import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import style from './style';
import { STAR_COLOR, STAR } from '../../resources/images';
import { bind } from '../../lib/decorators';

interface Props {
  score: number,
  voted?: boolean,
  rating: number,
  onRate?: (rating: number) => void,
  disable: boolean,
}

class Rating extends React.Component<Props> {
  @bind
  handleRate(rating: number) {
    if (this.props.onRate) {
      this.props.onRate(rating);
    }
  }

  renderStars() {
    const stars = [];
    for (let i = this.props.score; i > 0; i--) {
      const r = i;
      stars.push(<TouchableOpacity
        disabled={this.props.disable}
        key={i}
        onPress={() => this.handleRate(r)}
      >
        <Image
          source={this.props.rating < i ? STAR : STAR_COLOR}
          style={style.starItem}
        />
      </TouchableOpacity>);
    }
    return stars;
  }

  render() {
    return (
      <View style={style.container}>
        {this.renderStars()}
      </View>
    );
  }
}

export default Rating;

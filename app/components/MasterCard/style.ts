import { StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const style = StyleSheet.create({
  containerMaster: {
    marginHorizontal: 16,
    backgroundColor: StyleGuide.palette.white,
    borderRadius: 16,
    marginTop: 16,
  },
  opacity: {
    opacity: 0.5,
  },
  touchMaster: {
    flexDirection: 'row',
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    height: 55,
    borderRadius: 27,
    marginRight: 12,
  },
  padding: {
    padding: 16,
  },
  containerStars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
    marginRight: 5,
  },
  imgStar: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
  styleScroll: {
    paddingRight: 16,
  },
  selectTime: {
    backgroundColor: StyleGuide.palette.pink,
    paddingVertical: 8,
    paddingLeft: 13,
    paddingRight: 14,
    borderWidth: 1,
    borderColor: StyleGuide.palette.pink,
    borderRadius: 8,
    marginRight: 12,
  },
  time: {
    paddingVertical: 8,
    paddingLeft: 13,
    paddingRight: 14,
    borderWidth: 1,
    borderColor: StyleGuide.palette.light_gray,
    borderRadius: 8,
    marginRight: 12,
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default style;

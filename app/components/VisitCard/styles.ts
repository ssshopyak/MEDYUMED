import { StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const style = StyleSheet.create({
  animateView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 5,
  },
  containerAnim: {
    backgroundColor: StyleGuide.palette.white,
    padding: 20,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  pressChange: {
    alignItems: 'center', marginRight: 15,
  },
  imgSwipe: {
    width: 20,
    height: 20,
  },
  swipe: {
    overflow: 'visible',
  },
  pressDel: {
    alignItems: 'center',
  },
  mainView: {
    backgroundColor: StyleGuide.palette.white,
    borderRadius: 16,
    paddingVertical: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    paddingRight: 18,
    marginBottom: 16,
  },
  servicePrice: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  description: {
    flexDirection: 'row',
    paddingTop: 16,
  },
  img: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  mt: {
    fontSize: 16,
    color: StyleGuide.palette.darkness_grey,
    marginTop: 16,
    padding: 0,
  },
  titlePrice: {
    flex: 1, marginRight: 8,
  },
});

export default style;

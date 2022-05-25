import { Dimensions, Platform, StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const { height } = Dimensions.get('window');

const wth = Platform.OS === 'ios' ? 130 : 75;

const style = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.white,
    flex: 1,
  },
  mainContainer: {
    backgroundColor: StyleGuide.palette.background,
    flex: 1,
  },
  rightButton: {
    marginRight: 20,
    width: 20,
    height: 20,
  },
  viewContainer: {
    margin: 16,
  },
  viewButtonContinue: {
    position: 'absolute',
    right: 16,
    top: height - wth,
  },
  buttonFeedback: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 20,
    borderRadius: 24,
    paddingVertical: 16,
    backgroundColor: StyleGuide.palette.pink,
    alignItems: 'center',
  },
  touchStyle: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: StyleGuide.palette.pink,
    borderRadius: 16,
    alignItems: 'center',
  },
  containerService: {
    borderRadius: 32,
    backgroundColor: StyleGuide.palette.white,
  },
  renderService: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: StyleGuide.palette.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
  },
  imgRight: {
    width: 10,
    height: 20,
    marginLeft: 10,
    tintColor: StyleGuide.palette.white,
  },
  reset: {
    marginRight: 16,
  },
  separator: {
    paddingLeft: 40,
  },
  radioGroup: {
    alignItems: 'flex-start',
  },
  scrollContentStyle: {
    paddingBottom: 70,
  },
});

export default style;

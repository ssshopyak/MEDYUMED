import { StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
  },
  mainView: {
    justifyContent: 'center',
    flex: 1,
  },
  mainContainer: {
  },
  scrollView: {
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  contentStyle: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animImg: {
    position: 'absolute',
    top: -65,
    width: 130,
    height: 130,
  },
  mainText: {
    paddingTop: 20,
    textAlign: 'center',
  },
  smallImg: {
    width: 20,
    height: 20,
    tintColor: StyleGuide.palette.pink,
    marginRight: 10,
  },
  viewClock: {
    flexDirection: 'row',
  },
  viewGeolocation: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleService: {
    flex: 1,
    marginRight: 8,
  },
  touchConfirm: {
    borderRadius: 16,
    backgroundColor: StyleGuide.palette.white,
    padding: 16,
    width: 310,
    marginRight: 16,
    justifyContent: 'space-between',
  },
  viewButtonContinue: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: 20,
    marginRight: 16,
  },
  touchStyle: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: StyleGuide.palette.pink,
    borderRadius: 16,
  },
  imgRight: {
    width: 16,
    height: 20,
    marginRight: 10,
    tintColor: StyleGuide.palette.white,
  },
});

export default style;

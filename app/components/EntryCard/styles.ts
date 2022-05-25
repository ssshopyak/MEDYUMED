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
    alignItems: 'center',
    marginRight: 15,
  },
  imgSwipe: {
    width: 20,
    height: 20,
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
  imgButton: {
    tintColor: StyleGuide.palette.white,
    width: 20,
    height: 20,
    marginRight: 6,
  },
  imgButtonCancel: {
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
    flex: 1,
    marginRight: 8,
  },
  viewAllButton: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 25,
  },
  buttonFeedback: {
    flexDirection: 'row',
    paddingVertical: 6,
    marginRight: 12,
    borderRadius: 32,
    paddingLeft: 12,
    borderWidth: 1,
    borderColor: StyleGuide.palette.pink,
    alignItems: 'center',
    paddingRight: 10,
  },
  mainViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonCancel: {
    paddingVertical: 6,
    marginRight: 12,
    borderRadius: 32,
    paddingLeft: 12,
    borderWidth: 1,
    borderColor: StyleGuide.palette.pink,
    paddingRight: 10,
  },
  buttonRepeat: {
    flexDirection: 'row',
    backgroundColor: StyleGuide.palette.pink,
    paddingVertical: 6,
    borderRadius: 32,
    paddingLeft: 12,
    borderWidth: 1,
    borderColor: StyleGuide.palette.pink,
    alignItems: 'center',
    paddingRight: 15,
  },
});

export default style;

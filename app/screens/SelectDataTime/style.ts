import { StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: StyleGuide.palette.white,
    flex: 1,
  },
  container: {
    justifyContent: 'space-between',
    backgroundColor: StyleGuide.palette.separator,
    flex: 1,
    paddingHorizontal: 16,
  },
  bg: {
    backgroundColor: StyleGuide.palette.pink,
  },
  text: {
    color: StyleGuide.palette.white,
    fontWeight: 'bold',
  },
  padding16: {
    padding: 16,
  },
  radius16: {
    backgroundColor: StyleGuide.palette.white,
    paddingHorizontal: 4,
    marginTop: 16,
    borderRadius: 16,
  },
  viewSelectTime: {
    backgroundColor: StyleGuide.palette.white,
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
  },
  textSelectTime: {
    fontSize: 16,
    color: StyleGuide.palette.dark_grey,
  },
  selectTime: {
    backgroundColor: StyleGuide.palette.pink,
    borderWidth: 1,
    borderColor: StyleGuide.palette.pink,
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 14,
    borderRadius: 10,
    marginRight: 15,
    justifyContent: 'center',
  },
  styleScroll: {
    paddingRight: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  time: {
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 14,
    borderWidth: 1,
    borderColor: StyleGuide.palette.dark_grey,
    borderRadius: 10,
    marginRight: 15,
    justifyContent: 'center',
  },
  containerButton: {
    position: 'absolute',
    right: 16,
    bottom: 32,
  },
  disableButton: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: StyleGuide.palette.gray,
    borderRadius: 32,
  },
  activeButton: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: StyleGuide.palette.pink,
    borderRadius: 32,
  },
  image: {
    marginLeft: 6,
    tintColor: StyleGuide.palette.white,
    width: 10,
    height: 20,
  },
  load: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 105,
  },
  scroll: {
    paddingBottom: 50,
  },
});

export default style;

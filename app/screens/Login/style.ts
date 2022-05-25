import { StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';
import { isX } from '../../lib/utils';

const style = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.background,
    flex: 1,
  },
  viewButtonContinue: {
    position: 'absolute',
    right: 16,
    bottom: 32,
  },
  flex: {
    flex: 1,
  },
  kav: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
  },
  scrollStyle: {
    flexGrow: 1,
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
  imgRight: {
    width: 10,
    height: 20,
    marginLeft: 10,
    tintColor: StyleGuide.palette.white,
  },
  buttonClose: {
    backgroundColor: StyleGuide.palette.gray,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginLeft: 16,
    marginTop: 16,
    width: 36,
    height: 36,
  },
  imgBack: {
    width: 20,
    height: 20,
    tintColor: StyleGuide.palette.white,
  },
  enterCodeStyleView: {
    flex: 1,
    marginTop: isX() ? 114 : 54,
  },
  mainText: {
    textAlign: 'center',
    fontWeight: StyleGuide.fontWeight.BOLD,
  },
  description: {
    paddingTop: 30,
    textAlign: 'center',
  },
  phone: {
    textAlign: 'center',
  },
  enterCodeStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  code: {
    // position: 'absolute',
    // top: 110,
    // left: 60,
  },
  repeat: {
    marginTop: 16,
    textAlign: 'center',
  },
  repeatRetry: {
    marginTop: 16,
    alignItems: 'center',
  },
  mainTextPhone: {
    paddingTop: 50,
    textAlign: 'center',
    fontWeight: StyleGuide.fontWeight.BOLD,
  },
  mainTextPhone2: {
    textAlign: 'center',
    fontWeight: StyleGuide.fontWeight.BOLD,
  },
  inputPhone: {
    backgroundColor: StyleGuide.palette.white,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 77,
  },
  inputStyle: {
    padding: 0,
    fontSize: 20,
  },
});

export default style;

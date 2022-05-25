import { StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const style = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.background,
    flex: 1,
  },
  kav: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
  },
  viewButtonContinue: {
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
  imgRight: {
    width: 10,
    height: 20,
    marginLeft: 10,
    tintColor: StyleGuide.palette.white,
  },
  buttonClose: {
    backgroundColor: StyleGuide.palette.background,
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
  mainText: {
    textAlign: 'center',
    fontWeight: StyleGuide.fontWeight.BOLD,
  },
  mainText2: {
    textAlign: 'center',
    fontWeight: StyleGuide.fontWeight.BOLD,
  },
  inputName: {
    backgroundColor: StyleGuide.palette.white,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 77,
  },
  input: {
    backgroundColor: StyleGuide.palette.white,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  inputIncorrectEmail: {
    borderColor: StyleGuide.palette.orange,
    borderWidth: 1,
  },
  inputStyle: {
    padding: 0,
    fontSize: 20,
  },
  styleIncorrectEmail: {
    marginLeft: 32,
    marginTop: 10,
  },
  scroll: {
    paddingBottom: 80,
  },
});

export default style;

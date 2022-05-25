import { Dimensions, Platform, StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const { height } = Dimensions.get('window');

const wth = Platform.OS === 'ios' ? 130 : 75;

const style = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.white,
    flex: 1,
  },
  buttonClose: {
    width: 36,
    height: 36,
  },
  tapClose: {
    flex: 1,
    position: 'absolute',
    left: 16,
    top: 16,
  },
  buttonFeedback: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: height - wth,
    borderRadius: 24,
    paddingVertical: 16,
    backgroundColor: StyleGuide.palette.pink,
    alignItems: 'center',
  },
  buttonFeedbackDisable: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: height - wth,
    borderRadius: 24,
    paddingVertical: 16,
    backgroundColor: StyleGuide.palette.gray,
    alignItems: 'center',
  },
  kav: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
  },
  mainContainer: {
    backgroundColor: StyleGuide.palette.background,
    padding: 16,
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollStyle: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
  },
  viewStars: {
    flexDirection: 'row',
  },
  imgStars: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
  viewButtonContinue: {
    position: 'absolute',
    right: 16,
    top: height - wth,
  },
  touchStyle: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: StyleGuide.palette.pink,
    borderRadius: 16,
    alignItems: 'center',
  },
  imgRight: {
    width: 10,
    height: 20,
    marginLeft: 10,
    tintColor: StyleGuide.palette.white,
  },
  viewContent: {
    alignItems: 'center',
  },
  containerFeedback: {
    backgroundColor: StyleGuide.palette.white,
    width: '100%',
    padding: 16,
    marginTop: 65,
    borderRadius: 16,
  },
  nameMaster: {
    paddingTop: 44,
    paddingBottom: 12,
    textAlign: 'center',
  },
  descriptions: {
    textAlign: 'center',
    paddingBottom: 24,
  },
  assessment: {
    paddingTop: 23,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    height: 164,
    backgroundColor: StyleGuide.palette.background,
    textAlignVertical: 'top',
    fontSize: 16,
    padding: 0,
  },
  textCount: {
    textAlign: 'right',
  },
  imgMaster: {
    position: 'absolute',
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  inputStyle: {
    backgroundColor: StyleGuide.palette.background,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 6,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default style;

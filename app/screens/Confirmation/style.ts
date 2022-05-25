import { Dimensions, Platform, StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const { height } = Dimensions.get('window');

const wth = Platform.OS === 'ios' ? 177 : 127;

const style = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.white,
    flex: 1,
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
  mainContainer: {
    backgroundColor: StyleGuide.palette.background,
    flex: 1,
  },
  scroll: {
    paddingBottom: 80,
  },
  kav: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
  },
  renderContent: {
    backgroundColor: StyleGuide.palette.background,
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 16,
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
  mr: {
    marginRight: 16,
  },
  viewAgreement: {
    backgroundColor: StyleGuide.palette.white,
    borderRadius: 16,
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  textAgreement: {
    justifyContent: 'center',
  },
  touchAdd: {
    flex: 1, flexDirection: 'row', marginTop: 16, alignItems: 'center', marginHorizontal: 16,
  },
  imgAdd: {
    width: 34, height: 34, marginRight: 8,
  },
  viewVisits: {
    paddingHorizontal: 16,
  },
  points: {
    flexDirection: 'row',
  },
  reset: {
    marginRight: 16,
  },
});

export default style;

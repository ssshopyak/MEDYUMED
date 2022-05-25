import { Dimensions, Platform, StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const { height } = Dimensions.get('window');

const wth = Platform.OS === 'ios' ? 130 : 75;

const style = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.background,
    flex: 1,
  },
  scrollStyle: {
    paddingBottom: 20,
    paddingTop: 16,
  },
  marginStyle: {
    marginBottom: 12,
  },
  description: {
    textAlign: 'center',
  },
  viewSwitch: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  viewDescription: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  ratingMaster: {
    marginBottom: 12,
  },
  buttonClose: {
    width: 36,
    height: 36,
  },
  touchClose: {
    flex: 1,
    position: 'absolute',
    top: 16,
    left: 16,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 145,
    height: 145,
    borderRadius: 100,
  },
  viewButtonClose: {
    margin: 16,
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  searchPhoto: {
    width: 40,
    height: 40,
    marginBottom: 16,
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
  viewReview: {
    backgroundColor: StyleGuide.palette.white,
    borderRadius: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 32,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  viewContent: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  viewStars: {
    flexDirection: 'row',
  },
  imgStars: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
  name: {
    marginTop: 16,
  },
  text: {
    marginBottom: 16,
  },
  entriesContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
  viewEntry: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: StyleGuide.palette.white,
  },
  imgRevers: {
    width: 16,
    height: 20,
    marginRight: 6,
  },
  imgClock: {
    tintColor: StyleGuide.palette.pink,
    width: 16,
    height: 17,
    marginRight: 6,
  },
  buttonRepeat: {
    backgroundColor: StyleGuide.palette.pink,
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    borderRadius: 32,
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonChange: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: StyleGuide.palette.pink,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headText: {
    width: '70%',
  },
  map: {
    width: '100%',
    height: 109,
    marginBottom: 12,
  },
  filial: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  imgGeolocation: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  imgClockDateTime: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  typeService: {
    marginLeft: 16,
    marginBottom: 16,
  },
  entryCard: {
    paddingHorizontal: 16,
  },
});

export default style;

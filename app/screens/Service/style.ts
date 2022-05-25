import { Dimensions, Platform, StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const { height } = Dimensions.get('window');

const wth = Platform.OS === 'ios' ? 160 : 110;

const style = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.white,
    flex: 1,
  },
  mainContainer: {
    backgroundColor: StyleGuide.palette.background,
    flex: 1,
  },
  scrollContent: { flex: 1 },
  scrollView: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingTop: 16,
  },
  tabContainer: {
    backgroundColor: StyleGuide.palette.green,
    width: 155,
    height: 119,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    justifyContent: 'flex-end',
  },
  buttonStoke: {
    marginTop: 16,
    marginHorizontal: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: StyleGuide.palette.white,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameContent: {
    flexDirection: 'row',
  },
  imgFire: {
    width: 20,
    height: 20,
    marginRight: 16,
  },
  imgRightColor: {
    width: 20,
    height: 20,
    marginLeft: 6,
    tintColor: StyleGuide.palette.pink,
  },
  imgRight: {
    width: 20,
    height: 20,
    marginLeft: 6,
    tintColor: StyleGuide.palette.gray,
  },
  serviceTitle: {
    flex: 1,
    marginRight: 8,
  },
  serviceContent: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  allService: {
    backgroundColor: StyleGuide.palette.white,
    marginHorizontal: 16,
    borderRadius: 16,
    flex: 1,
    marginTop: 16,
  },
  rightButton: {
    marginRight: 20,
    width: 20,
    height: 20,
  },
  list: {
    marginTop: 16,
  },
  line: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: StyleGuide.palette.pink,
    width: 35,
  },
  lineEmpty: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: StyleGuide.palette.background,
    width: 35,
  },
  viewTypeService: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  touchType: {
    paddingBottom: 5,
  },
  separator: {
    paddingLeft: 40,
  },
  renderService: {
    paddingHorizontal: 16,
    backgroundColor: StyleGuide.palette.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
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
  headerTitle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerInput: {
    width: '77%',
    marginLeft: 16,
    backgroundColor: StyleGuide.palette.separator,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  mainContentSearch: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: StyleGuide.palette.white,
    borderRadius: 16,
  },
  emptyScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchSearchStyle: {
    padding: 0,
    fontSize: 16,
  },
  scrollContentStyle: {
    paddingBottom: 20,
  },
  radioGroup: {
    maxWidth: '70%',
    alignItems: 'flex-start',
  },
});

export default style;

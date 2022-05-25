import { Dimensions, StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const { width } = Dimensions.get('screen');

const style = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.white, flex: 1,
  },
  mainContainer: {
    backgroundColor: StyleGuide.palette.background, flex: 1,
  },
  scrollView: {
    flexDirection: 'row',
    padding: 16,
  },
  flatList: {
    paddingVertical: 16, paddingLeft: 16, paddingRight: 4,
  },
  contentStyleScroll: {
    paddingRight: 16,
  },
  tabs: {
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: StyleGuide.palette.white,
    padding: 16,
    marginRight: 12,
    minWidth: 127,
  },
  imgInfo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  infoView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoDescription: {
    fontWeight: '600',
  },
  margin: {
    marginBottom: 12,
  },
  st: {
    marginLeft: 12,
  },
  selectFilial: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: StyleGuide.palette.pink,
    borderRadius: 32,
    marginLeft: 16,
  },
  filial: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: StyleGuide.palette.gray,
    borderRadius: 32,
    marginLeft: 16,
  },
  scrollFilial: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingLeft: 16,
  },
  buttonStoke: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: StyleGuide.palette.white,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgFire: {
    width: 20,
    height: 20,
    marginRight: 16,
  },
  imgRightColor: {
    width: 24,
    height: 24,
    marginLeft: 3,
    tintColor: StyleGuide.palette.pink,
  },
  textMargin: {
    marginLeft: 16,
    marginBottom: 16,
  },
  mainContentCategory: {
    paddingHorizontal: 8,
  },
  containerCategory: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
  },
  containerCategoryLast: {
    marginTop: 10,
    flexDirection: 'row',
    marginBottom: 16,
  },
  imgLeft: {
    width: (width - 47) / 2,
    height: 120,
    borderRadius: 16,
  },
  imgRight: {
    width: (width - 47) / 2,
    height: 120,
    borderRadius: 16,
  },
  names: {
    textAlign: 'left',
  },
  scroll: {
    backgroundColor: StyleGuide.palette.background,
    paddingBottom: 10,
  },
  scrollMargin: {
    marginBottom: 16,
    marginTop: 8,
  },
  contentScroll: {
    paddingRight: 16,
  },
});

export default style;

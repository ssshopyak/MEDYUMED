import { StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const style = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.white,
    flex: 1,
  },
  mainContainer: {
    backgroundColor: StyleGuide.palette.background,
    justifyContent: 'space-between',
    flex: 1,
  },
  reset: {
    marginRight: 16,
  },
  viewButtonContinue: {
    position: 'absolute',
    right: 16,
    bottom: 20,
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
  selectFilial: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: StyleGuide.palette.pink,
    borderRadius: 32,
    marginRight: 16,
  },
  filial: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: StyleGuide.palette.gray,
    borderRadius: 32,
    marginRight: 16,
  },
  contentFlatlist: {
    paddingRight: 16,
  },
  flatList: {
    paddingTop: 16,
    paddingLeft: 16,
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  textTop: {
    marginTop: 5,
    marginRight: 8,
  },
  image: {
    width: 26,
    height: 20,
  },
  mainButton: {
    paddingVertical: 25,
    paddingHorizontal: 16,
    backgroundColor: StyleGuide.palette.white,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
  },
  mainButtonInfo: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: StyleGuide.palette.white,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  scrollFilial: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingLeft: 16,
  },
  hint: {
    paddingLeft: 16,
  },
  emptyFilial: {
    paddingLeft: 16,
    marginBottom: 8,
  },
  scroll: {
    paddingBottom: 80,
  },
});

export default style;

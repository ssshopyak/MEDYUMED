import { Platform, StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const style = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.white,
    flex: 1,
  },
  mainContainer: {
    backgroundColor: StyleGuide.palette.background,
    flex: 1,
  },
  styleScroll: {
    paddingRight: 16,
  },
  rightButton: {
    marginRight: 20,
    width: 20,
    height: 20,
  },
  reset: {
    marginRight: 16,
  },
  viewSale: {
    backgroundColor: StyleGuide.palette.white,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 3,
    marginBottom: 16,
    borderRadius: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
  },
  selectSale: {
    borderWidth: 1,
    borderColor: StyleGuide.palette.pink,
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 32,
    marginRight: 15,
    justifyContent: 'center',
  },
  sale: {
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: StyleGuide.palette.gray,
    borderRadius: 32,
    marginRight: 15,
    justifyContent: 'center',
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  mainContent: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  buttonFeedback: {
    justifyContent: 'flex-end',
    borderRadius: 24,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 32 : 21,
    backgroundColor: StyleGuide.palette.pink,
    alignItems: 'center',
  },
  touchSale: {
    backgroundColor: StyleGuide.palette.white,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginBottom: 16,
    borderRadius: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
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
  title: {
    flex: 1,
    marginRight: 8,
  },
  scroll: {
    paddingBottom: 16,
  },
});

export default style;

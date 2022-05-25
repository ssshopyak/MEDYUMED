import { StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const style = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.white,
    flex: 1,
  },
  containerMasters: {
    backgroundColor: StyleGuide.palette.background,
    flex: 1,
    justifyContent: 'space-between',
  },
  mainContainer: {
    backgroundColor: StyleGuide.palette.background,
    flex: 1,
  },
  viewButtonContinue: {
    position: 'absolute',
    right: 16,
    bottom: 32,
  },
  touchStyle: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: StyleGuide.palette.pink,
    borderRadius: 16,
    alignItems: 'center',
  },
  flatList: {
    paddingBottom: 60,
  },
  imgRight: {
    width: 10,
    height: 20,
    marginLeft: 10,
    tintColor: StyleGuide.palette.white,
  },
});

export default style;

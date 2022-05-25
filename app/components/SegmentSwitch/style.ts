import { StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const style = StyleSheet.create({
  mainSwitch: {
    backgroundColor: StyleGuide.palette.background,
  },
  container: {
    backgroundColor: StyleGuide.palette.white,
    flexDirection: 'row',
    borderRadius: 10,
  },
  activeButton: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: StyleGuide.palette.pink,
  },
  disableButton: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: StyleGuide.palette.white,
  },
});

export default style;

import { Dimensions, Platform, StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const { width } = Dimensions.get('window');

const CENTER_BUTTON_WIDTH = 50;
const LOGO_BUTTON_PADDING = 20;

const height = 56;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingBottom: Platform.OS !== 'ios' ? 7 : 0,
  },
  container: {
    backgroundColor: StyleGuide.palette.white,
    borderRadius: 16,
    paddingHorizontal: 22,
    justifyContent: 'space-between',
  },
  image: {
    width,
    height,
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 3,
  },
  button: {
    width: (width - CENTER_BUTTON_WIDTH - LOGO_BUTTON_PADDING) / 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabBar: {
    width: '100%',
    height,
    flexDirection: 'row',
  },
});

export default styles;

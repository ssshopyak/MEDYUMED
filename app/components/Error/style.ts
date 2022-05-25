import { StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const style = StyleSheet.create({
  container: {
    flex: 1, paddingHorizontal: 37, justifyContent: 'center',
  },
  mainContainer: {
    justifyContent: 'center', alignItems: 'center',
  },
  wifiImg: {
    width: 101, height: 63,
  },
  searchImg: {
    width: 56, height: 56, marginBottom: 30,
  },
  title: {
    fontWeight: StyleGuide.fontWeight.SEMI_BOLD, paddingBottom: 15,
  },
  update: {
    paddingVertical: 16, backgroundColor: StyleGuide.palette.gray, marginTop: 40, borderRadius: 23,
  },
});

export default style;

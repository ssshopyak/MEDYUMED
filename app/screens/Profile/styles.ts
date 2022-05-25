import { StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const style = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.white,
  },
  mainContainer: {
    backgroundColor: StyleGuide.palette.background,
  },
  scrollView: {
    flexDirection: 'row',
    padding: 16,
  },
  scroll: {
    paddingRight: 16,
  },
  tabs: {
    borderRadius: 16,
    backgroundColor: StyleGuide.palette.white,
    padding: 16,
    marginRight: 12,
    minWidth: 127,
  },
  containerInfo: {
    backgroundColor: StyleGuide.palette.white,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  touchStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  selectLanguage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    marginLeft: 30,
    marginVertical: 12,
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
  margin: {
    marginBottom: 12,
  },
});

export default style;

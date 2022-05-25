import { StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const styles = StyleSheet.create({
  placeholder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: StyleGuide.palette.light_gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 50, height: 50,
  },
  headerBtn: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeImage: {
    width: 24,
    height: 24,
    tintColor: StyleGuide.palette.white,
    position: 'absolute',
  },
  imageWrapper: { position: 'absolute', width: '100%', height: '100%' },
  headerWrapper: {
    width: '100%',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;

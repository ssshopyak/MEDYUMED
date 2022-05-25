import { StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const styles = StyleSheet.create({
  modalEmotionContentContainer: {
    backgroundColor: StyleGuide.palette.white,
    marginHorizontal: 10,
    borderRadius: 16,
  },
  styleView: {
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: StyleGuide.palette.white,
  },
  buttonStyle: {
    paddingVertical: 16,
  },
  mainContent: {
    flex: 1,
    backgroundColor: StyleGuide.palette.overlay,
    justifyContent: 'flex-end',
  },
  title: {
    color: StyleGuide.palette.gray,
    fontSize: 13,
  },
  content: {
    width: '100%',
  },
  mainText: {
    color: StyleGuide.palette.pink,
    fontSize: 20,
  },
  styleScroll: {
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: StyleGuide.palette.orange,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: StyleGuide.palette.black,
    opacity: 0.1,
  },
  cancelText: {
    fontSize: 20,
  },
});

export default styles;

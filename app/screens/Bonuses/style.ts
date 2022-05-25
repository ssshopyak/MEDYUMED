import { StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.white,
  },
  mainContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: StyleGuide.palette.background,
  },
  smallView: {
    position: 'absolute',
    marginVertical: 10,
    marginHorizontal: 9,
    backgroundColor: StyleGuide.palette.white,
    width: '96%',
    height: 129,
    top: 12,
    left: 15,
    borderRadius: 16,
  },
  shadow: {
    marginBottom: 20,
    backgroundColor: StyleGuide.palette.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: StyleGuide.shadow.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.2,
  },
  styleText: {
    flexDirection: 'row',
  },
  separator: {
    marginVertical: 15,
  },
  description: {
    flexDirection: 'row',
  },
  img: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: StyleGuide.palette.dark_grey,
    marginTop: 3,
  },
  flex: {},
  mrr: {
    marginRight: 8,
  },
  padding: {
    paddingRight: 16,
  },
  balance: {
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
  },
  code: {
    marginBottom: 10,
  },
  button: {
    borderRadius: 16,
  },
});

export default style;

import { StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const style = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.white,
    flex: 1,
  },
  mainContainer: {
    backgroundColor: StyleGuide.palette.background,
    paddingTop: 16,
    paddingHorizontal: 16,
    flex: 1,
  },
  mainSwitch: {
    backgroundColor: StyleGuide.palette.background,
  },
  containerVisits: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: StyleGuide.palette.white,
    padding: 16,
    marginTop: 16,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  containerMainInformation: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 8,
  },
  price: {
    flex: 1,
    marginLeft: 14,
  },
  photo: {
    width: 52,
    height: 52,
    marginRight: 14,
  },
  description: {
    flexDirection: 'row',
    marginTop: 5,
  },
  standardPhoto: {
    width: 24,
    height: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  searchPhoto: {
    width: 40,
    height: 40,
    marginBottom: 13,
  },
  scroll: {
    paddingBottom: 16,
  },
  flex1: {
    flex: 1,
  },
  ended: {
    flex: 1,
    marginTop: 5,
  },
});

export default style;

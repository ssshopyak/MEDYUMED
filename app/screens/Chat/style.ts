import { StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.white,
  },
  emptyScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  viewBranch: {
    backgroundColor: StyleGuide.palette.white,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
  },
  viewBranchFirst: {
    backgroundColor: StyleGuide.palette.white,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    maxWidth: 312,
  },
  marker: {
    width: 28,
    height: 34,
  },
  title: {
    marginBottom: 10,
  },
  address: {
    marginBottom: 16,
  },
  phoneTouch: {
    padding: 4,
  },
  viewFreeTime: {
    marginTop: 16,
    flexDirection: 'row',
  },
  date: {
    paddingLeft: 4,
  },
  viewBranches: {
    justifyContent: 'flex-end',
    paddingVertical: 10,
  },
  branches: {
  },
  list: {
    paddingLeft: 16,
  },
  flex1: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default style;

import { StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const style = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.white,
    flex: 1,
  },
  containerView: {
    backgroundColor: StyleGuide.palette.background,
    flex: 1,
  },
  mainContainer: {
    justifyContent: 'space-between',
    backgroundColor: StyleGuide.palette.background,
    padding: 16,
    flex: 1,
  },
  containerInfo: {
    backgroundColor: StyleGuide.palette.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  input: {
    padding: 0, fontSize: 17,
  },
  separator: {
    marginLeft: 30,
    marginVertical: 12,
  },
  dateInput: {
    padding: 0,
  },
  allert: {
    marginTop: 4,
    alignItems: 'center',
    padding: 16,
    backgroundColor: StyleGuide.palette.white,
    flexDirection: 'row',
    borderRadius: 16,
  },
  textMargin: {
    marginBottom: 8,
  },
  imgLogout: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  imgOk: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  kav: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
  },
  saveButton: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: StyleGuide.palette.pink,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButtonSave: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});

export default style;

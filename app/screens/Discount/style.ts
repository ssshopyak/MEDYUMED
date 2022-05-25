import { StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const style = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.white,
    flex: 1,
  },
  mainContainer: {
    backgroundColor: StyleGuide.palette.background,
    padding: 16,
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  searchPhoto: {
    width: 40,
    height: 40,
    marginBottom: 16,
  },
  card: {
    backgroundColor: StyleGuide.palette.white,
    padding: 16,
    marginTop: 16,
    borderRadius: 16,
  },
  subsUsed: {
    marginTop: 4,
    marginBottom: 30,
    flexDirection: 'row',
  },
  number: {
    textAlign: 'right',
  },
  certifDescr: { marginTop: 2 },
  mainCertificate: {
    alignItems: 'center',
    marginTop: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontWeight: StyleGuide.fontWeight.BOLD,
  },
});

export default style;

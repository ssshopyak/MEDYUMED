import { StyleSheet } from 'react-native';
import { StyleGuide } from '../../resources/StyleGuide';

const styles = StyleSheet.create({
  container: {
    width: '90%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  symbol: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbolTextStyle: {
    textAlign: 'center',
    fontSize: 20,
  },
  symbolContainer: {
    backgroundColor: StyleGuide.palette.white,
    borderRadius: 12,
    marginHorizontal: 8,
    width: 50,
    height: 64,
  },
  focusedSymbolContainer: {
    backgroundColor: StyleGuide.palette.white,
    borderRadius: 12,
    marginHorizontal: 8,
    width: 50,
    height: 64,
  },
  textInput: {
    position: 'absolute',
    height: 0,
    width: 0,
  },

});
export default styles;

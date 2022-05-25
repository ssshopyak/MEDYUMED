import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { StyleGuide, TypographyTypes } from '../resources/StyleGuide';
import { ImageButton } from './buttons/ImageButton';
import { CHEVRON_LEFT } from '../resources/images';
import { Typography } from './Typography';

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 5,
    backgroundColor: StyleGuide.palette.white,
    borderColor: StyleGuide.palette.separator,
    borderBottomWidth: 1,
    width: '100%',
    height: 52,
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: StyleGuide.palette.black,
  },
  rightButtonContainer: {
    marginLeft: 13,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    borderRadius: 20,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  leftButtonContainer: {
    overflow: 'hidden',
    position: 'absolute',
    left: 3,
    borderRadius: 20,
  },
  titleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: 200,
    marginRight: 13,
  },
  search: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 9 : 8,
  },
});

interface Props {
  onTitlePress?: () => void,
  title: string,
  tintColor?: string,
  onBackPress?: () => void,
  renderRightButton?: () => React.ReactElement,
  renderLeftButton?: () => React.ReactElement,
  renderSearch?: () => React.ReactElement,
  wrapperStyle?: ViewStyle | ViewStyle[],
  search?: boolean,
}

export function Header(props: Props) {
  const { wrapperStyle, tintColor = StyleGuide.palette.black, onBackPress, renderLeftButton, renderSearch, onTitlePress, title, renderRightButton, search } = props;
  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      {search && renderSearch ? (
        <View style={styles.search}>
          {renderSearch()}
        </View>
      )
         : <View style={styles.container}>
           {onBackPress ? (
             <ImageButton
               image={CHEVRON_LEFT}
               onPress={onBackPress}
               tintColor={tintColor}
               wrapperStyle={styles.leftButtonContainer}
             />
          ) : null}
           {renderLeftButton ? (
             <View style={styles.leftButtonContainer}>
               {renderLeftButton()}
             </View>
          ) : null}
           <TouchableOpacity
             activeOpacity={1}
             disabled={!onTitlePress}
             onPress={onTitlePress}
             style={styles.titleWrapper}
           >
             <Typography
               color={tintColor}
               numberOfLines={1}
               style={styles.title}
               type={TypographyTypes.REGULAR17}
             >
               {title}
             </Typography>
           </TouchableOpacity>
           {renderRightButton ? (
             <View style={styles.rightButtonContainer}>
               {renderRightButton()}
             </View>
          ) : null}
         </View>}
    </View>
  );
}

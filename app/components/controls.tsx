import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Image, PixelRatio, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleGuide, TypographyTypes } from '../resources/StyleGuide';
import { Typography } from './Typography';
import { useWrappedCallback } from '../lib/hooks';
import { CHECK_ICON } from '../resources/images';

const styles = StyleSheet.create({
  radioGroup: { alignItems: 'center', justifyContent: 'center' },
  radioGroupConfirmation: { },
  groupTitle: {
    paddingHorizontal: 14,
  },
  radioButtonItem: {
    marginVertical: 18,
  },
  radioButtonItemConfirmation: {
    marginVertical: 23,
    marginLeft: 16,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: PixelRatio.roundToNearestPixel(1.5),
  },
  dotConfirmation: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: PixelRatio.roundToNearestPixel(1.5),
  },
  dotCenter: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: StyleGuide.palette.pink,
    justifyContent: 'center',
  },
  dotCenterConfirmation: {
    width: 20,
    height: 20,
    backgroundColor: StyleGuide.palette.pink,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  textWrapper: {
    justifyContent: 'center',
    marginLeft: 8,
  },
  title: {
    marginLeft: 8,
  },
});

interface DotProps {
  confirmation: boolean;
  selected: boolean;
  dotStyle?: ViewStyle | ViewStyle[];
  onPress?: () => void;
}

function Dot(props: DotProps) {
  const animatedTrigger = useRef(new Animated.Value(props.selected ? 1 : 0));

  useEffect(() => {
    animatedTrigger.current.setValue(props.selected ? 1 : 0);
  }, [props.selected]);

  const { onPress, dotStyle } = props;
  const _dotStyle = useMemo(() => StyleSheet.flatten(props.confirmation ? [styles.dotConfirmation, dotStyle] : [styles.dot, dotStyle]), [dotStyle, props.confirmation]);
  const dot = useMemo(() => StyleSheet.flatten(props.confirmation ? styles.dotCenterConfirmation : styles.dotCenter), [props.confirmation]);

  return (
    <>
      <TouchableOpacity
        disabled={!onPress}
        onPress={onPress}
      >
        <View style={props.selected ? [{ borderColor: StyleGuide.palette.pink }, _dotStyle] : [{ borderColor: StyleGuide.palette.background }, _dotStyle]}>
          {props.selected && <View style={dot}>
            {props.confirmation && <Image
              source={CHECK_ICON}
              style={{
                width: 12,
                height: 12,
                alignItems: 'center',
              }}
            />}
          </View>}
        </View>
      </TouchableOpacity>
    </>
  );
}

export interface CheckBoxProps {
  style?: ViewStyle;
  dotStyle?: ViewStyle | ViewStyle[];
  children: React.ReactNode | string;
  selected: boolean;
  onDotPress?: () => void;
  onItemPress?: () => void;
  typographyType?: TypographyTypes;
  confirmation: boolean;
}

export function CheckBox(props: CheckBoxProps) {
  const { children, typographyType } = props;
  const containerStyle = useMemo(() => StyleSheet.flatten([styles.checkbox, props.style]), [props.style]);
  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={!props.onItemPress}
      onPress={props.onItemPress}
    >
      <View style={containerStyle}>
        <Dot
          confirmation={props.confirmation}
          dotStyle={props.dotStyle}
          onPress={props.onDotPress}
          selected={props.selected}
        />
        <View style={styles.textWrapper}>
          {typeof children === 'string' ? <Typography type={typographyType || TypographyTypes.REGULAR12}>{children}</Typography> : children}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export interface RadioGroupProps<T = string> {
  title?: string;
  items: T;
  selected: T;
  onSelect: (item: T) => void;
  wrapperStyle?: ViewStyle;
  translate?: (item: T) => string;
  keyExtractor?: (item: T, index: number) => string;
  confirmation: boolean;
}

function RadioGroupItem<T>(props: { item: T, selected: T, onSelect: (item: T) => void, translate?: (item: T) => string, confirmation: boolean}) {
  const select = useWrappedCallback(props.onSelect, props.item);
  const item = props.item;
  return (
    <View>
      <CheckBox
        confirmation={props.confirmation}
        onDotPress={select}
        onItemPress={select}
        selected={props.selected === item}
        style={props.confirmation ? styles.radioButtonItemConfirmation : styles.radioButtonItem}
      >
        {props.translate ? <Typography
          type={TypographyTypes.REGULAR17}
        >{props.translate(item)}</Typography> : <Typography
          style={styles.title}
          type={TypographyTypes.REGULAR17}
        >{item}</Typography>}
      </CheckBox>
    </View>
  );
}

export function RadioGroup<T>(props: RadioGroupProps<T>) {
  const renderItem = useCallback((item: T) => (
    <RadioGroupItem
      confirmation={props.confirmation}
      item={item}
      onSelect={props.onSelect}
      selected={props.selected}
      translate={props.translate}
    />
  ), [props.confirmation, props.onSelect, props.selected, props.translate]);

  const { title, items } = props;
  const wrapperStyle = useMemo(() => StyleSheet.flatten([props.confirmation ? styles.radioGroupConfirmation : styles.radioGroup, props.wrapperStyle]), [props.confirmation, props.wrapperStyle]);
  return (
    <View style={wrapperStyle}>
      {title ? (
        <Typography
          style={styles.groupTitle}
          type={TypographyTypes.REGULAR16}
        >
          {title}
        </Typography>
        ) : null}
      {renderItem(items)}
    </View>
  );
}

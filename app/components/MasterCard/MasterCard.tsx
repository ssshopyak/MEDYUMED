import { TouchableOpacity, View } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import style from './style';
import { Typography } from '../Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import Rating from '../Rating';
import { Separator } from '../Separator';
import { Master } from '../../lib/types';
import { useWrappedCallback } from '../../lib/hooks';
import Avatar from '../Avatar';

interface Props {
  master: Master;
  selectedMaster?: Master;
  needOpenInfoAboutMaster: (master: Master)=>void;
  onSelectMaster: (master: Master)=>void;
}

export function MasterCard(props: Props) {
  const { master, selectedMaster } = props;
  const checkCard: boolean = useMemo(() => selectedMaster?.id === master.id || selectedMaster === undefined, [selectedMaster, master]);

  const setMaster = useWrappedCallback(props.onSelectMaster, props.master);
  const openInfoAboutMaster = useWrappedCallback(props.needOpenInfoAboutMaster, props.master);

  const styles = useMemo(() => (
    checkCard ? style.containerMaster : [style.containerMaster, style.opacity]
  ), [checkCard]);
  const renderRating = useCallback(() => (
    <View style={style.containerStars}>
      <Rating
        disable
        key={props.master.rating}
        rating={props.master.rating}
        score={5}
        voted
      />
    </View>
  ), [props.master.rating]);

  return (
    <TouchableOpacity
      onPress={setMaster}
    >
      <View style={styles}>
        <View style={style.padding}>
          <View style={style.touchMaster}>
            <Avatar
              photo={props.master.photo}
              style={style.img}
              user={{ firstName: props.master.name }}
            />
            <View>
              <Typography type={TypographyTypes.REGULAR16}>{props.master.name}</Typography>
              {renderRating()}
            </View>
          </View>
          {props.master.about.length > 0 ? <Typography
            style={{ marginTop: 16 }}
            type={TypographyTypes.REGULAR14}
          >{props.master.about}</Typography> : null}
        </View>
        <Separator
          color={StyleGuide.palette.light_gray}
          height={1}
          wrapperStyle={{ }}
        />
        <Typography
          color={StyleGuide.palette.pink}
          onPress={openInfoAboutMaster}
          style={{ padding: 16, fontWeight: StyleGuide.fontWeight.SEMI_BOLD }}
          type={TypographyTypes.REGULAR14}
        >
          Отзывы
        </Typography>
      </View>
    </TouchableOpacity>
  );
}

import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import style from '../screens/Main/style';
import { Typography } from './Typography';
import { StyleGuide, TypographyTypes } from '../resources/StyleGuide';
import { CIRCLE, CLOCK } from '../resources/images';

interface BubbleProps {
  content: { title: string, description: string, navigate: string }[];
  pressInContent: (content: string)=>void;
}

export function Bubble(props: BubbleProps) {
  return (
    <FlatList
      contentContainerStyle={style.flatList}
      data={props.content}
      horizontal
      renderItem={item => (<TouchableOpacity
        onPress={() => props.pressInContent(item.item.navigate)}
        style={style.tabs}
      >
        <Typography
          style={style.margin}
          type={TypographyTypes.REGULAR16}
        >{item.item.title}</Typography>
        {item.item.description === '20 000 Б'
       ? <Typography
           color={StyleGuide.palette.pink}
           type={TypographyTypes.REGULAR14}
       >
         {item.item.description}
       </Typography>
       : <View style={style.infoView}><Image
           source={item.item.title === 'Визиты' ? CLOCK : CIRCLE}
           style={style.imgInfo}
       />
         <Typography
           color={StyleGuide.palette.dark_grey}
           type={TypographyTypes.REGULAR14}
         >{item.item.description}</Typography>
       </View>
      }
      </TouchableOpacity>)}
      showsHorizontalScrollIndicator={false}
    />
  );
}

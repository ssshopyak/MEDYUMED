import { Image, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { Header } from '../../components/Header';
import { DISCOUNT, GLOBUS, PROFILE } from '../../resources/images';
import { Separator } from '../../components/Separator';
import { ProfileProps } from '../../navigation/types';
import styles from './styles';
import { Typography } from '../../components/Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import ActionSheet from '../../components/ActionSheet';
import I18n, { changeLocale } from '../../resources/localization/translations';
import { setLanguage } from '../../redux/actions';

export function Profile(props: StackScreenProps<ProfileProps>) {
  const dispatch = useDispatch();
  const [language, setMyLanguage] = useState(I18n.currentLocale() === 'ru' ? I18n.t('Russian') : I18n.t('English'));

  const pressInSelectLanguage = useCallback((shortLanguage: string, installedLanguage: string) => {
    dispatch(setLanguage(shortLanguage));
    changeLocale(shortLanguage);
    setMyLanguage(I18n.t(installedLanguage));
  }, [dispatch]);

  const onPress = () => {
    const reasons: string[] = [I18n.t('English'), I18n.t('Russian'), I18n.t('cancel')];

    ActionSheet.show({
      title: I18n.t('selectLanguage'),
      cancelButtonIndex: reasons.length - 1,
      options: reasons,
      tintColor: StyleGuide.palette.pink,
    }, (index) => {
      if (index === 0) {
        pressInSelectLanguage('en', 'English');
      } else if (index === 1) {
        pressInSelectLanguage('ru', 'Russian');
      }
    });
  };

  const pressOption = () => {
    props.navigation.navigate('personalInfo');
  };

  const renderMainOption = () => (
    <View style={styles.containerInfo}>
      <ProfileButton
        img={PROFILE}
        needSeparator
        onPress={pressOption}
        title={I18n.t('personalData')}
      />
      <ProfileButton
        img={DISCOUNT}
        needSeparator
        onPress={() => props.navigation.navigate('discount')}
        title={I18n.t('subscriptionsAndCertificates')}
      />
      <ProfileButton
        img={DISCOUNT}
        needSeparator
        onPress={() => props.navigation.navigate('visits')}
        title={I18n.t('histirypos')}
      />
      <ProfileButton
        img={DISCOUNT}
        needSeparator
        onPress={() => props.navigation.navigate('discount')}
        title={I18n.t('medcart')}
      />
      <TouchableOpacity
        onPress={onPress}
        style={styles.touchStyle}
      >
        <Image
          source={GLOBUS}
          style={styles.img}
        />
        <View style={styles.selectLanguage}>
          <Typography type={TypographyTypes.REGULAR17}>{I18n.t('selectLanguage')}</Typography>
          <Typography
            color={StyleGuide.palette.dark_grey}
            type={TypographyTypes.REGULAR14}
          >{language}</Typography>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={styles.container}
    >
      <Header title={I18n.t('profile')} />
      <View style={styles.mainContainer}>
        {/* {renderContent} */}
        {renderMainOption()}
      </View>
    </SafeAreaView>
  );
}

interface ProfileButtonProps {
  onPress:()=>void;
  img: any;
  title: string;
  needSeparator: boolean;
}

function ProfileButton(props: ProfileButtonProps) {
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        style={styles.touchStyle}
      >
        <Image
          source={props.img}
          style={styles.img}
        />
        <Typography type={TypographyTypes.REGULAR17}>{props.title}</Typography>
      </TouchableOpacity>
      {props.needSeparator ? <Separator
        color={StyleGuide.palette.separator}
        height={1}
        wrapperStyle={styles.separator}
      /> : null }
    </View>
  );
}

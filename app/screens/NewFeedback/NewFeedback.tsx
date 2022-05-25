import { StackScreenProps } from '@react-navigation/stack';
import { Image, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useInstance } from 'react-ioc';
import { MainStackProps } from '../../navigation/types';
import style from './style';
import { Typography } from '../../components/Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import { Separator } from '../../components/Separator';
import { CLOSE } from '../../resources/images';
import { KAV } from '../../components/KAV';
import Rating from '../../components/Rating';
import { Master } from '../../lib/types';
import { BigButton } from '../../components/buttons/BigButton';
import Avatar from '../../components/Avatar';
import { UserRepository } from '../../model/repositories/UserRepository';
import { CommentsViewModels } from '../../model/viewModels/CommentsViewModels';
import I18n from '../../resources/localization/translations';
import { ApiReview } from '../../model/api/apiTypes';
import { useAppSelector } from '../../redux/hooks/selectors';

export function NewFeedback(props: StackScreenProps<MainStackProps>) {
  const { params } = props.route;

  const userModel = useInstance(UserRepository);
  const reduxComments = useInstance(CommentsViewModels);

  const user = useAppSelector(state => state.user);

  const [pressStar, setPressStar] = useState(0);
  const [master, setMaster] = useState<Master>();
  const [focus, setFocus] = useState(false);

  const [feedbackText, setFeedbackText] = useState<ApiReview>({
    name: user.name,
    review: '',
    rating: 0,
  });

  // @ts-ignore
  const masters = params?.selectMasters;
  // @ts-ignore
  const appointmentId = params?.appointmentId;

  useEffect(() => {
    props.navigation.addListener('blur', () => {
      setPressStar(0);
      setFocus(false);
      setFeedbackText({
        name: '',
        review: '',
        rating: 0,
      });
    });
    setMaster(masters);
  }, [master, masters, props.navigation]);

  const getColor = (countStar: number) => {
    switch (countStar) {
      case 1: {
        return StyleGuide.palette.orange;
      }
      case 2: {
        return StyleGuide.palette.orange;
      }
      case 3: {
        return StyleGuide.palette.yellow;
      }
      case 4: {
        return StyleGuide.palette.green;
      }
      case 5: {
        return StyleGuide.palette.green;
      }
      default:
        return StyleGuide.palette.black;
    }
  };

  const color = getColor(pressStar);

  const newComment = useMemo(() => (
    { ...feedbackText, rating: pressStar, review: feedbackText?.review }
  ), [feedbackText, pressStar]);

  const onBackPress = useCallback(async () => {
    const sentReview = await userModel.addMasterReviews({ appointmentId, rating: newComment.rating.toString(), review: feedbackText?.review.trim() });
    if (sentReview) {
      await userModel.masterReviews(masters.id);
      reduxComments.setComment(newComment);
      props.navigation.navigate('selectMaster', { selectMasters: masters });
    }
  }, [appointmentId, feedbackText?.review, masters, newComment, props.navigation, reduxComments, userModel]);

  const onFocus = () => {
    setFocus(true);
  };

  const onSubmitEditing = () => {
    setFocus(false);
  };

  const checkFeedbackCommentLength = useMemo(() => (
    feedbackText?.review.length < 1000
  ), [feedbackText?.review.length]);

  const changeText = useCallback((text: string) => {
    const newText = text.length > 1000 ? text.substr(0, 1000) : text;
    setFeedbackText({ ...feedbackText, review: newText });
    if (feedbackText.review.length > 1000) {
      setFeedbackText({ ...feedbackText, review: feedbackText.review.substr(0, 1000) });
    }
  }, [feedbackText]);

  const renderInputFeedback = useCallback(() => (
    <View style={style.inputStyle}>
      <TextInput
        editable={checkFeedbackCommentLength}
        multiline={true}
        onChangeText={changeText}
        onFocus={onFocus}
        onSubmitEditing={onSubmitEditing}
        placeholder={I18n.t('enterFeedback')}
        placeholderTextColor={StyleGuide.palette.gray}
        selectionColor={StyleGuide.palette.pink}
        style={style.textInput}
        value={feedbackText.review}
      />
      {focus
       ? <Typography
           color={feedbackText.review.length === 1000 ? StyleGuide.palette.pink : StyleGuide.palette.gray}
           style={style.textCount}
           type={TypographyTypes.REGULAR14}
       >{feedbackText.review.length}/1000</Typography> : null}
    </View>
  ), [changeText, checkFeedbackCommentLength, feedbackText.review, focus]);

  const renderGoBack = useCallback(() => {
    props.navigation.navigate('selectMaster', { selectMasters: master });
  }, [master, props.navigation]);

  const styleButtonContinue = useMemo(() => (
    pressStar > 0 || feedbackText.review.length > 0 ? style.buttonFeedback : style.buttonFeedbackDisable
  ), [feedbackText.review.length, pressStar]);

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={style.container}
    >
      <KAV style={style.kav}>
        <View style={style.flex}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={style.scrollStyle}
          >
            <View style={style.mainContainer}>
              <View style={style.viewContent}>
                <View style={style.containerFeedback}>
                  <Typography
                    style={style.nameMaster}
                    type={TypographyTypes.REGULAR18}
                  >{master?.name}</Typography>
                  {master && master.about.length > 0 ? <Typography
                    color={StyleGuide.palette.dark_grey}
                    style={style.descriptions}
                    type={TypographyTypes.REGULAR14}
                  >{master!.about}</Typography> : null}
                  <Separator
                    color={StyleGuide.palette.light_gray}
                    height={1}
                  />
                  <View style={style.assessment}>
                    <Typography
                      color={color}
                      type={TypographyTypes.REGULAR16}
                    >{I18n.t('assessment')} {pressStar > 0 ? pressStar + '/5 ' : '   ' }</Typography>
                    <Rating
                      disable={false}
                      onRate={setPressStar}
                      rating={pressStar}
                      score={5}
                    />
                  </View>
                  {renderInputFeedback()}
                </View>
                <Avatar
                  photo={master?.photo}
                  style={style.imgMaster}
                  user={{ firstName: master?.name }}
                />
              </View>
              <TouchableOpacity
                onPress={renderGoBack}
                style={style.tapClose}
              >
                <Image
                  source={CLOSE}
                  style={style.buttonClose}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
          <BigButton
            containerStyle={styleButtonContinue}
            disabled={pressStar === 0 && feedbackText.review.length === 0}
            onPress={onBackPress}
            text={I18n.t('evaluateService ')}
            textColor={StyleGuide.palette.white}
          />
        </View>
      </KAV>
    </SafeAreaView>
  );
}

import React from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Modal,
  Image,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  ImageResizeMode, StyleProp, ImageStyle as RNImageStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage, { ImageStyle as FIImageStyle } from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import styles from './styles';
import { bind } from '../../lib/decorators';
import { CommonImageProps, ImageComponentType } from '../../lib/types';
import SafeArea from '../SafeArea';
import { StyleGuide } from '../../resources/StyleGuide';
import { DELETE, ONBOARD1 } from '../../resources/images';

interface Props extends CommonImageProps {
  style: StyleProp<RNImageStyle & FIImageStyle>;
  onLoad?: () => void;
  onError?: () => void;
  resizeMode?: Exclude<ImageResizeMode, 'repeat'>,
  handleResendImage?: (index: number) => void,
  source: Array<{ uri: string, headers?: {}, preview: string }>,
  isOpenable?: boolean,
  onLongPress?: () => void,
  ImageComponent?: ImageComponentType;
  index?: number,
  onOpenImageViewer?: () => void,
  onCloseImageViewer?: () => void,
  needLoader?: boolean,
  isSave?: boolean,
}

interface State {
  visible: boolean,
  selectedIndex: number,
}

const FADE_DURATION = 300;

const { width } = Dimensions.get('window');

export default class ImageWithPlaceholder extends React.Component<Props, State> {
  state: State = {
    visible: false,
    selectedIndex: this.props.index || 0,
  };

  placeholderOpacityAnim = new Animated.Value(1);

  @bind
  showImageView() {
    const { onOpenImageViewer } = this.props;
    if (onOpenImageViewer && typeof (onOpenImageViewer) === 'function') {
      onOpenImageViewer();
    }
    this.setState({ visible: true });
  }

  @bind
  hideImageView() {
    const { onCloseImageViewer } = this.props;
    if (onCloseImageViewer && typeof (onCloseImageViewer) === 'function') {
      onCloseImageViewer();
    }
    this.setState({ visible: false });
  }

  @bind
  handleLoad() {
    Animated.timing(this.placeholderOpacityAnim, {
      toValue: 0,
      duration: FADE_DURATION,
      useNativeDriver: true,
    }).start();
  }

  @bind
  forward() {
    if (this.props.handleResendImage) {
      this.props.handleResendImage(this.state.selectedIndex);
    }
    this.hideImageView();
  }

  @bind
  handleChangeSelectedIndex(index: number | undefined) {
    if (index !== undefined) {
      this.setState({
        selectedIndex: index,
      });
    }
  }

  @bind
  renderHeader() {
    return (
      <View style={styles.headerWrapper}>
        <SafeAreaView />
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={this.hideImageView}
            style={styles.headerBtn}
          >
            <Image
              source={DELETE}
              style={styles.closeImage}
            />
          </TouchableOpacity>
        </View>
      </View>);
  }

  @bind
  renderImage(props: any) {
    const { ImageComponent = FastImage } = this.props;
    return (
      <ImageComponent
        source={ONBOARD1}
        {...props}
      />
    );
  }

  renderIndicator() {
    return <View />;
  }

  renderLoading() {
    return (<ActivityIndicator
      color={StyleGuide.palette.white}
      size='large'
    />);
  }

  render() {
    const { style, isOpenable, ImageComponent = FastImage, ...props } = this.props;
    const imageOpacity = this.placeholderOpacityAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
    return (
      <View style={style}>
        <TouchableOpacity
          activeOpacity={1}
          delayLongPress={300}
          delayPressIn={0}
          disabled={!isOpenable}
          onLongPress={this.props.onLongPress}
          onPress={this.showImageView}
        >
          <Modal
            onRequestClose={this.hideImageView}
            transparent={true}
            visible={this.state.visible}
          >
            <SafeArea
              color={StyleGuide.palette.black}
              elevation={0}
              needBottom={false}
            >
              <StatusBar barStyle='light-content' />
              <View style={styles.imageWrapper}>
                <ImageViewer
                  enableSwipeDown
                  failImageSource={{
                    url: this.props.source[this.props.index || 0].uri,
                    props: {
                      headers: this.props.source[this.props.index || 0].headers,
                    },
                    width,
                    height: width,
                  }}
                  imageUrls={this.props.source.map(item => ({
                    url: item.uri,
                    headers: item.headers,
                  }))}
                  index={this.props.index || 0}
                  loadingRender={this.renderLoading}
                  onChange={this.handleChangeSelectedIndex}
                  onSwipeDown={this.hideImageView}
                  renderImage={this.renderImage}
                  renderIndicator={this.renderIndicator}
                  saveToLocalByLongPress={false}
                />
              </View>
              {this.renderHeader()}
            </SafeArea>
          </Modal>
          <Animated.View style={[style, { opacity: imageOpacity }]}>
            <ImageComponent
              {...props}
              onLoadEnd={this.handleLoad}
              source={{
                uri: this.props.source[this.props.index || 0].preview || this.props.source[this.props.index || 0].uri,
                headers: this.props.source[this.props.index || 0].headers,
              }}
              style={style}
            />
          </Animated.View>
          <Animated.View style={[styles.placeholder, this.props.style, { opacity: this.placeholderOpacityAnim }]}>
            {this.props.needLoader ? <ActivityIndicator color={StyleGuide.palette.white} /> : null}
            <Image
              source={ONBOARD1}
              style={styles.img}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}

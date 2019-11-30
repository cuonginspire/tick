import React, { useState } from 'react';
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Modal,
  Dimensions
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Icon, Text } from 'react-native-ui-kitten';
import { color } from 'src/config/theme';

interface Props {
  onGetImages: Function;
}

const AttachmentButton: React.FC<Props> = ({ onGetImages }) => {
  const [visible, setVisible] = useState(false);
  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL,
        Permissions.CAMERA
      );
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
  const pickImageFromLibrary = async () => {
    await getPermissionAsync();
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (!result.cancelled) {
      onGetImages(result.uri);
    }
    setVisible(!visible);
  };
  const pickImageFromCamera = async () => {
    await getPermissionAsync();
    let result: any = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (!result.cancelled) {
      onGetImages(result.uri);
    }
    setVisible(!visible);
  };
  const handlePress = () => {
    setVisible(!visible);
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
          <Icon
            name='attach-outline'
            width={24}
            height={24}
            fill={color.primary}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal transparent animationType='fade' visible={visible}>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <TouchableHighlight onPress={pickImageFromCamera}>
              <View
                style={{
                  ...styles.button,
                  borderTopStartRadius: 10,
                  borderTopEndRadius: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#fff'
                }}
              >
                <Text style={{ textAlign: 'center' }} category='s2'>
                  Choose from Camera
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={pickImageFromLibrary}>
              <View
                style={{
                  ...styles.button,
                  borderBottomWidth: 5,
                  borderBottomColor: '#fff'
                }}
              >
                <Text style={{ textAlign: 'center' }} category='s2'>
                  Choose for Library
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setVisible(!visible)}>
              <View
                style={{
                  ...styles.button,
                  ...styles.cancelButton,
                  borderBottomEndRadius: 10,
                  borderBottomStartRadius: 10
                }}
              >
                <Text style={{ textAlign: 'center' }} category='s2'>
                  Cancel
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </>
  );
};

AttachmentButton.defaultProps = {
  onGetImages: () => {}
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: color.primary
  },
  modal: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.background,
    opacity: 0.5,
    padding: 16
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 10,
    alignSelf: 'stretch'
  },
  button: {
    padding: 12,
    width: Dimensions.get('window').width - 32,
    textAlign: 'center'
  },
  cancelButton: {
    backgroundColor: '#FF3D71'
  }
});

export default AttachmentButton;

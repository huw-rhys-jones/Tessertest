import React, {useState} from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';

const DEFAULT_HEIGHT = 500;
const DEFAULT_WITH = 600;
const defaultPickerOptions = {
  cropping: true,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WITH,
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  const [text, setText] = useState('');
  // useEventListener('onProgressChange', (p) => {
  //   setProgress(p.percent / 100);
  // });

  const recognizeTextFromImage = async (path) => {
    // setIsLoading(true);

    // try {
    //   const tesseractOptions = {};
    //   const recognizedText = await TesseractOcr.recognize(
    //     path,
    //     LANG_ENGLISH,
    //     tesseractOptions,
    //   );
    //   setText(recognizedText);
    // } catch (err) {
    //   console.error(err);
    //   setText('');
    // }

    // setIsLoading(false);
    setProgress(0);
  };

  const recognizeFromPicker = async (options = defaultPickerOptions) => {
    try {
      let image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        // aspect: [4, 8],
        quality: 1,
        // base64: true
      });
      setImgSrc({uri: image.assets[0].uri});
      console.log(image.assets[0].uri)
      const result = await TextRecognition.recognize(image.assets[0].uri);
      console.log(result)
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
    }
  };

  const recognizeFromCamera = async (options = defaultPickerOptions) => {
    // try {
    //   const image = await ImagePicker.openCamera(options);
    //   setImgSrc({uri: image.path});
    //   await recognizeTextFromImage(image.path);
    // } catch (err) {
    //   if (err.message !== 'User cancelled image selection') {
    //     console.error(err);
    //   }
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OCR example</Text>
      <Text style={styles.instructions}>Select an image source:</Text>
      <View style={styles.options}>
        <View style={styles.button}>
          <Button
            disabled={isLoading}
            title="Camera"
            onPress={() => {
              recognizeFromCamera();
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={isLoading}
            title="Picker"
            onPress={() => {
              recognizeFromPicker();
            }}
          />
        </View>
      </View>
      {imgSrc && (
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={imgSrc} />
          {isLoading ? (
            <Text>hello</Text>
          ) : (
            <Text>{text}</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    marginHorizontal: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginVertical: 15,
    height: DEFAULT_HEIGHT / 2.5,
    width: DEFAULT_WITH / 2.5,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;

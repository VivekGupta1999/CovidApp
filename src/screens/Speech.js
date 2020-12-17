import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';
const RNFS = require('react-native-fs');
const Sound = require('react-native-sound');
import Svg from '../../images/image.svg';
import LinearGradient from 'react-native-linear-gradient';

// create the api's header, body
const createRequest = async text => ({
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    input: {
      text: text,
    },
    voice: {
      languageCode: 'en-US',
      name: 'en-US-Standard-B',
      ssmlGender: 'FEMALE',
    },
    audioConfig: {
      audioEncoding: 'MP3',
    },
  }),
  method: 'POST',
});

// call the google text to speech api
const speech = async text => {
  const key = 'AIzaSyAdEFmqJvdkwIJH2dNz3MPgfabczyebnhs';
  const address = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${key}`;
  const payload = await createRequest(text);
  return new Promise(async (resolve, reject) => {
    const path = `${RNFS.DocumentDirectoryPath}/voice.mp3`;
    try {
      const response = await fetch(`${address}`, payload);
      //console.log(response);
      const result = await response.json();
      console.log(result);
      await createFile(path, result.audioContent);
      await playMusic(path);
      if (result) {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      }
    } catch (err) {
      console.warn(err);
      Alert.alert(err.message);
      reject(false);
    }
  });
};

// play the audio received from google cloud api
const playMusic = async music => {
  const speech = new Sound(music, '', error => {
    if (error) {
      console.warn('failed to load the sound', error);
      Alert.alert('failed to load the sound ' + error.message);

      return null;
    }
    speech.play(success => {
      if (!success) {
        console.warn('playback failed due to audio decoding errors');
        Alert.alert('playback failed due to audio decoding errors');
        return null;
      }
    });
    RNFS.unlink(music);
    return true;
  });
};

// here we store the base64 audio return by google cloud api
const createFile = async (path, data) => {
  try {
    return await RNFS.writeFile(path, data, 'base64');
  } catch (err) {
    Alert.alert(err.message);
    console.warn(err);
  }

  return null;
};
export default class Speech extends Component {
  constructor(props) {
    super(props);

    //Setting callbacks for the process status
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;

    this.state = {
      words: [
        'Hello, Bilal',
        'How Are You',
        'Where Are You From',
        'What Are You Doing Now',
        'What Is Your Profession',
        'Are You A Student',
        'Whats Your Country Name',
        'How Is The Situation Of Corona There',
        'Do You Feel Any Symptoms ?',
        'Do You Have Dry Cough',
        'Do You Have Shortage Of Breath',
        'Do You Have Headache',
        'Did You Travel Abroad Recently',
        'If You Have Any Symptoms Then Please Visit The Nearby Clinic',
        'All Done Please Start Again If You Like It!',
      ],
      index: 0,
      buttonDisablled: false,
      error: '',
      end: '',
      started: '',
      results: [],
      text: '',
      recordingText: '',
      status: '',
    };
  }

  componentDidMount = async () => {
    // await Tts.speak(this.state.words[this.state.index]);
    this.setState({buttonDisablled: false});
  };

  componentWillUnmount() {
    //destroy the process after switching the screen
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = e => {
    //Invoked when .start() is called without error
    console.log('onSpeechStart: ', e);
    this.setState({status: true, error: ''});
  };

  onSpeechEnd = e => {
    //Invoked when SpeechRecognizer stops recognition
    console.log('onSpeechEnd: ', e);
    this.setState({status: false});
  };

  onSpeechError = e => {
    //Invoked when an error occurs.
    console.log('onSpeechError: ', e);
    this.setState({
      error: e.error.message,
    });
    this.play();
  };

  onSpeechResults = e => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults: ', e);
    this.setState({
      buttonDisablled: true,
      index: 1 + this.state.index,
      recordingText: e.value[0],
    });
    if (this.state.index < this.state.words.length) {
      this.play();
    } else {
      this.setState({buttonDisablled: false});
    }
  };

  _startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    this.setState({buttonDisablled: false});
    try {
      await Voice.start('en-US');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
      //await Tts.stop();
      this.setState({buttonDisablled: true});
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  play = async (index = this.state.index) => {
    ` `;
    this.setState({
      text: this.state.words[index] ? this.state.words[index] : this.state.text,
    });
    if (this.state.index < this.state.words.length) {
      await speech(index == 0 ? this.state.words[0] : this.state.text)
        .then(async data => {
          this.setState({buttonDisablled: true});
          await Voice.start('en-US');
        })
        .catch(async err => {
          play(index);
        });
    } else {
      this.setState({buttonDisablled: false, index: 0});
      await Voice.stop();
      //await Tts.stop();
    }
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#192f6a', '#3b5998', '#4c669f']}
            style={styles.linearGradient}>
            {/* <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Map', { data: "" });
              }}>
              <Image style={styles.image} source={require('../../images/google-maps-png-google-maps-icon-1600.png')} />
            </TouchableOpacity> */}
            <Text style={styles.welcome}>HealthApp</Text>

            <Text style={styles.middleHeading}>
              Start the speech recognition
            </Text>
            <Text
              style={{
                fontSize: 25,
                color: 'white',
                textAlign: 'center',
                marginHorizontal: 10,
              }}>
              {this.state.text}
            </Text>
            <Text
              style={{
                fontSize: 25,
                color: 'rgb(255,255,250)',
                textAlign: 'center',
                marginHorizontal: 10,
              }}>
              {this.state.recordingText}
            </Text>
            {this.state.status ? <Svg width="200" height="200" /> : null}
            <Text style={{fontSize: 20, color: 'red'}}>{this.state.error}</Text>
            <TouchableHighlight
              style={{
                ...styles.btn,
                backgroundColor: this.state.buttonDisablled ? 'blue' : 'white',
              }}
              underlayColor={'pink'}
              disabled={this.state.buttonDisablled}
              onPress={() => this.play(0)}>
              <Text
                style={{
                  fontSize: 15,
                  color: this.state.buttonDisablled ? 'white' : '#5862aa',
                }}>
                Start
              </Text>
            </TouchableHighlight>
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mapView: {
    flexDirection: 'row',
  },
  image: {
    height: 60,
    // marginRight: "20%",
    width: 60,
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
    alignSelf: 'center',
    // marginRight: "30%",
    margin: 10,
    color: 'white',
  },
  middleHeading: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  linearGradient: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    borderColor: 'black',
    borderWidth: 1,
    width: 90,
    height: 50,
    borderRadius: 28,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
});

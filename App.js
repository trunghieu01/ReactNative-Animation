import { StatusBar } from 'expo-status-bar';
import { Animated, StyleSheet, Text, View, Button, Easing, Image } from 'react-native';
import { useRef, useEffect } from 'react';

export default function App() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const someValue = useRef(new Animated.Value(100)).current;

  const fly = useRef(new Animated.Value(0)).current;
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true
      }
    ).start();
    Animated.timing(
      someValue,
      {
        toValue: 7,
        duration: 100000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start();
    Animated.loop(
      // runs the animation array in sequence
      Animated.sequence([
        // shift element to the left by 2 units
        Animated.timing(anim, {
          toValue: -2,
          duration: 50,
          useNativeDriver: true
        }),
        // shift element to the right by 2 units
        Animated.timing(anim, {
          toValue: 2,
          duration: 50,
          useNativeDriver: true
        }),
        // bring the element back to its original position
        Animated.timing(anim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true
        }),
      ]),
      // loops the above animation config 2 times
      { iterations: 1000 }
    ).start();
  }, [])

  const flyAction = () => {
    Animated.timing(fly, {
      toValue: 300,
      duration: 5000,
      useNativeDriver: true
    }).start();
  }

  const stop = () => {
    Animated.timing(fly, {
      toValue: 300,
      duration: 5000,
      useNativeDriver: true
    }).stop();
  }

  const reset = () => {
    Animated.timing(fly, {
      toValue: 300,
      duration: 5000,
      useNativeDriver: true
    }).reset();
  }

  const rotateData = someValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  // const shakeBell = shake.interpolate({
  //   inputRange: [0, 0.25, 0.50, 0.75, 1],
  //   outputRange: [10, 20, 10, 0, 10]
  // })


  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={{ fontSize: 18 }}>Welcome to Animation React Native</Text>
      </Animated.View>
      <View style={{ width: 150, padding: 20 }}>
        <Button title='Fly' onPress={flyAction}></Button>
      </View>
      <Animated.View style={{ opacity: fly, marginLeft: -300, transform: [{ translateX: fly }] }}>
        <Image style={{ height: 40, resizeMode: 'contain' }} source={require('./assets/bird.png')}></Image>
      </Animated.View>
      <View style={{ paddingVertical: 20, flexDirection: 'row', }}>
        <Button title='Start' onPress={flyAction}></Button>
        <Button title='Stop' onPress={stop}></Button>
        <Button title='Reset' onPress={reset}></Button>
      </View>
      <Animated.View style={{ width: 50, height: 50, transform: [{ translateX: anim }]  }}  >
        <Image style={{ width: 50, height: 50}} source={require('./assets/chuong.png')}></Image>
      </Animated.View>
      <Animated.Image style={{ opacity: someValue, width: 100, height: 100, transform: [{ rotate: rotateData }] }} source={require('./assets/react.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

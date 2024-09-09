import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Dimensions,
  Image,
  Text,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Platform,
  StatusBar,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";



const ResponsiveUIApp = () => {
  const [isRoateScreen, setIsRoateScreen] = useState(false);
  const { width, height } = useWindowDimensions(); // Lấy kích thước của cửa sổ hiện tại
  useEffect(() => {
    ScreenOrientation.unlockAsync();
    // Thêm sự kiện lắng nghe sự thay đổi hướng màn hình
    const subscription = ScreenOrientation.addOrientationChangeListener(
      _orientationDidChange
    );
    // Xoá sự kiện khi component unmount
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);
  const _orientationDidChange = ({ orientationInfo }: any) => {
    if (
      orientationInfo.orientation ===
        ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
      orientationInfo.orientation ===
        ScreenOrientation.Orientation.LANDSCAPE_RIGHT
    ) {
      setIsRoateScreen(true);
    } else if (
      orientationInfo.orientation ===
        ScreenOrientation.Orientation.PORTRAIT_UP ||
      orientationInfo.orientation ===
        ScreenOrientation.Orientation.PORTRAIT_DOWN
    ) {
      setIsRoateScreen(false);
    }
  };

  // Chiều rộng của hình ảnh là 80% chiều rộng của màn hình
  const imageWidth = width * 0.8;

  const styles = StyleSheet.create({
    container: {
      padding: Platform.select({
        ios: 20, // Giá trị padding cho iOS
        android: 10, // Giá trị padding cho Android
      }),
      flexDirection: "column",
      gap: 10,
      marginTop: 35,
      marginBottom: 20,
      alignItems: "center",
    },

    textInput: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      width: "100%",
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      width: "80%",
    },
  });
  return (
    <SafeAreaView style={{backgroundColor: "#D3D3D3", flex:1}}>
      <StatusBar backgroundColor="#6a51ae"    hidden={false}  animated={true} />
      <ScrollView>
        <View style={[styles.container]}>
          <View style={{ flexDirection: isRoateScreen ? "column" : "row" }}>
            {/* Nút đầu tiên */}
            <View
              style={[
                {
                  width: isRoateScreen ? width : width / 2,

                  backgroundColor: "green",
                },
              ]}
            >
              <Button title="Button 1" onPress={() => {}} />
            </View>

            {/* Nút thứ hai */}
            <View
              style={[
                {
                  width: isRoateScreen ? width : width / 2,
                  backgroundColor: "pink",
                },
              ]}
            >
              <Button title="Button 2" onPress={() => {}} />
            </View>
          </View>
          {/* Hình ảnh */}
          <Image
            source={require("./assets/hacker.jpg")}
            style={{ width: imageWidth, height: imageWidth * 0.5 }} // Chiều cao được tính theo tỷ lệ 2:1
            resizeMode="contain" // Điều chỉnh hình ảnh trong khung mà không cắt
          />
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView>
              <TextInput style={styles.input} placeholder="Nhập thông tin..." />
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResponsiveUIApp;

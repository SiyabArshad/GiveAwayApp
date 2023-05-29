import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

//config
import Colors from "../../config/Colors";

function InputField({
  onTouchStart = () => {},
  onTouchEnd = () => {},
  placeholder,
  multipleLines = false,
  handleFeild,
  borderColor = Colors.white,
  borderWidth = RFPercentage(0),
  fontFamily = null,
  placeholderColor = "#B4B6B8",
  borderRadius = RFPercentage(1),
  backgroundColor = Colors.white,
  keyboardType = "default",
  textCenter = "left",
  fontSize = RFPercentage(2.5),
  editIcon = false,
  dropdownIcon = false,
  placeholderAtCenter = false,
  width,
  value,
  height = RFPercentage(6.9),
  secure = false,
  handleClear = false,
  placeholderAtStart = false,
  leftIconName = "",
  autoFocus = false,
  searchMarginLeft = null,
  color = "black",
  ...otherProps
}) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: borderWidth,
        width: width,
        height: height,
        borderRadius: borderRadius,
        marginVertical: RFPercentage(0.7),
      }}
    >
      <TextInput
        placeholder={placeholder}
        multiline={multipleLines ? true : false}
        placeholderTextColor={placeholderColor}
        onChangeText={(text) => handleFeild(text)}
        onResponderStart={onTouchStart}
        onEndEditing={onTouchEnd}
        value={value}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        secureTextEntry={secure && !eyeIcon}
        textAlign={"right"}
        style={{
          flexWrap: "wrap",
          right: RFPercentage(3),
          top: placeholderAtStart ? RFPercentage(-10) : 0,
          color: color,
          alignSelf: "center",
          fontFamily: fontFamily,
          fontSize: fontSize,
          width: leftIconName ? "85%" : "90%",
        }}
        {...otherProps}
      ></TextInput>
    </View>
  );
}

export default InputField;

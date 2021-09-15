import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/colors'

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).raduis, style]} onPress={props.onPress}>
      <Text style={[styles(size).text, textStyle]}>{props.title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    raduis: {
      borderRadius: size / 2,
      borderColor: colors.white,
      borderWidth: 2,
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: colors.white,
      fontSize: size / 3.5,
      textAlign: "center",
    },
  });

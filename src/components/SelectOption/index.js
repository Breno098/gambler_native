import React from 'react';
import { Picker } from '@react-native-community/picker'

export default function SelectOption({ children, ...props }) {

  return (
    <Picker.Item {...props} />
  );
}

import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const useStatusBar = (backgroundColor, barStyle = 'default') => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBackgroundColor(backgroundColor);
      StatusBar.setBarStyle(barStyle);
    }
  }, [isFocused, backgroundColor, barStyle]);
};

export default useStatusBar;

import React from 'react';
import { Dimensions, } from 'react-native';

import {
  HStack,
  Center,
  useColorMode,
  Spinner,
} from "native-base"

const Loading = () => {
  const windowWidth = Dimensions.get('window').width

  const { colorMode } = useColorMode();

  return <Center bg={colorMode === "dark" ? "coolGray.800" : "white"} flex={1} w={windowWidth}>
    <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading posts" />
    </HStack>
  </Center>;
}

export default Loading;
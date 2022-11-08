import React from 'react';

import {
  Box,
  Text,
} from 'native-base';

const Toast = (props: any) => {
  return <Box bg="emerald.500" borderRadius={1} borderColor="black" px="2" py="1" rounded="lg" mt={3} shadow={1}>
    <Text fontSize={"lg"} color={"white"}>{props.title}</Text>
  </Box>;
}

export default Toast;
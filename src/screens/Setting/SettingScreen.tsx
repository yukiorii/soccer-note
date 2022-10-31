import { SafeAreaView } from 'react-native';
import { RootTabScreenProps } from 'src/types/index';

import {
  VStack,
  Button,
} from "native-base";

export default function SettingScreen({ navigation }: RootTabScreenProps<'Setting'>) {
  return (
    <SafeAreaView>
      <VStack mt="4" alignItems={"center"} space="2">
        <Button w="32" size={"lg"} rounded={"full"} onPress={() => console.log("hello world")}>公式戦</Button>
        <Button w="32" size={"lg"} rounded={"full"} onPress={() => console.log("hello world")}>公式戦</Button>
      </VStack>
    </SafeAreaView>
  );
}

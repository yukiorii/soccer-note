import { SafeAreaView } from 'react-native';

import {
  VStack,
  Button,
} from "native-base";

import { HomeStackParamList } from 'src/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export default function OfficialGameScreen({ navigation }: NativeStackScreenProps<HomeStackParamList, 'OfficialGame'>) {
  return (
    <SafeAreaView>
      <VStack mt="4" alignItems={"center"} space="2">
        <Button w="32" size={"lg"} rounded={"full"} onPress={() => console.log("hello world")}>公式戦</Button>
      </VStack>
    </SafeAreaView>
  );
}

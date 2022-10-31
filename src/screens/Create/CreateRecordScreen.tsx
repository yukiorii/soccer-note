import { SafeAreaView } from 'react-native';
import { CreateModalStackParamList } from 'src/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  VStack,
  Button,
} from "native-base";

export default function CreateRecordScreen({ navigation }: NativeStackScreenProps<CreateModalStackParamList, 'CreateRecordModal'>) {
  return (
    <SafeAreaView>
      <VStack mt="4" alignItems={"center"} space="2">
        <Button w="32" size={"lg"} rounded={"full"} onPress={() => console.log("hello world")}>公式戦</Button>
        <Button w="32" size={"lg"} rounded={"full"} onPress={() => console.log("hello world")}>公式戦</Button>
      </VStack>
    </SafeAreaView>
  );
}

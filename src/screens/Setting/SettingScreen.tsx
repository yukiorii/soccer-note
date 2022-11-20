import { TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { RootTabScreenProps } from 'src/types/index';
import { Feather } from '@expo/vector-icons';

import { useSetRecoilState } from 'recoil';
import { matchState } from 'src/atoms/MatchAtom';

import {
  VStack,
  HStack,
  Box,
  Text,
  Divider,
  Icon,
} from "native-base";

export default function SettingScreen({ navigation }: RootTabScreenProps<'Setting'>) {
  const setMatch = useSetRecoilState(matchState)

  const ResetMatchData = () => {
    setMatch([])
    Alert.alert("記録をリセットしました")
  }

  return (
    <SafeAreaView>
      <VStack mt="4" alignItems={"center"} space="2">

        {/* ユーザネーム変更 */}
        <TouchableOpacity>
          <HStack pl={3} py="4" alignItems={"center"}>
            <Box w="90%" justifyContent="center">
              <Text fontWeight="semibold" fontSize="md" _dark={{ color: "warmGray.100" }}>ユーザネーム変更</Text>
            </Box>
            <Box w="10%" alignItems="center">
              <Icon as={Feather} size={7} name="chevron-right" color="coolGray.500" _dark={{ color: "warmGray.400" }} />
            </Box>
          </HStack>
        </TouchableOpacity>
        <Divider w="95%" />

        <TouchableOpacity onPress={ResetMatchData}>
          <HStack pl={3} py="4" alignItems={"center"}>
            <Box w="100%" justifyContent="center">
              <Text fontWeight="semibold" fontSize="md" _dark={{ color: "warmGray.100" }}>記録リセット</Text>
            </Box>
          </HStack>
        </TouchableOpacity>

      </VStack>
    </SafeAreaView>
  );
}
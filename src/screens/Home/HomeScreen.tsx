import { Alert, SafeAreaView } from 'react-native';
import ThemedStatusBar from 'src/components/ThemedStatusBar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import { useRecoilValue } from 'recoil';
import { matchState, sameMonthMatchState, matchByTypeState } from 'src/atoms/MatchAtom';

import {
  Box,
  VStack,
  Text,
  HStack,
  Pressable,
} from "native-base";

import { HomeStackParamList } from 'src/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MATCH_TYPE } from 'src/config/const';

export default function HomeScreen({ navigation }: NativeStackScreenProps<HomeStackParamList, 'Home'>) {
  const allMatch = useRecoilValue(matchState)
  const officalMatch = useRecoilValue(matchByTypeState(MATCH_TYPE.公式戦))
  const practiceMatch = useRecoilValue(matchByTypeState(MATCH_TYPE.練習試合))
  const sameMonthMatch = useRecoilValue(sameMonthMatchState(new Date()))

  const OfficialGameButtonPressed = () => {
    if (officalMatch.length == 0) {
      Alert.alert("まだ記録がありません")
      return
    }
    navigation.navigate("OfficialGame")
  }

  const PracticeGameButtonPressed = () => {
    if (practiceMatch.length == 0) {
      Alert.alert("まだ記録がありません")
      return
    }
    navigation.navigate("PracticeGame")
  }


  return (
    <SafeAreaView>
      <ThemedStatusBar />
      <VStack mt={4} space={2}>
        <Text ml={4} fontSize={"xl"} fontWeight="extrabold">今月の実績</Text>
        <HStack space={2} justifyContent="center">
          <Box bg="amber.100" width="46%" h={32} borderRadius={20} p={4}>
            <Text fontWeight="medium" fontSize={50}>{sameMonthMatch.length}</Text>
            <Text fontWeight="semibold">試合数</Text>
          </Box>
          <Box bg="blue.100" width="46%" h={32} borderRadius={20} p={4}>
            <Text fontWeight="medium" fontSize={50}>0</Text>
            <Text fontWeight="semibold">練習数</Text>
          </Box>
        </HStack>

        <Text mt={6} ml={4} fontSize={"xl"} fontWeight="extrabold">記録確認</Text>
        <HStack space={2} justifyContent="center">
          <Pressable w="32" onPress={OfficialGameButtonPressed}>
            {({ isPressed }) => {
              return <Box bg={isPressed ? "coolGray.100" : "red.100"} borderRadius={20} width={"100%"} h={32} p={4} alignItems="center" justifyContent={"center"}>
                <MaterialCommunityIcons name="soccer-field" size={60} color="black" />
                <Text fontWeight="semibold">公式戦</Text>
              </Box>
            }}
          </Pressable>
          <Pressable w="32" onPress={PracticeGameButtonPressed}>
            {({ isPressed }) => {
              return <Box bg={isPressed ? "coolGray.100" : "green.100"} borderRadius={20} width={"100%"} h={32} p={4} alignItems="center" justifyContent={"center"}>
                <Octicons name="people" size={60} color="black" />
                <Text fontWeight="semibold">練習試合</Text>
              </Box>
            }}
          </Pressable>
          <Box bg="blue.100" width="30%" h={32} borderRadius={20} p={4} alignItems="center" justifyContent={"center"}>
            <MaterialCommunityIcons name="soccer" size={60} color="black" />
            <Text fontWeight="semibold">練習</Text>
          </Box>
        </HStack>
      </VStack>
    </SafeAreaView>
  );
}

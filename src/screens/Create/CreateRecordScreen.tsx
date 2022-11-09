import React, { useState, useLayoutEffect } from 'react';
import { Platform, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native';
import { CreateModalStackParamList } from 'src/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import CustomToast from 'src/components/Toast';

import { useSetRecoilState } from 'recoil';
import { matchState } from 'src/atoms/MatchAtom';

import { MatchType } from 'src/types';
import { MATCH_TYPE } from 'src/config/const';

import i18n from 'src/utils/i18n/i18n';

import {
  VStack,
  HStack,
  Box,
  Text,
  Divider,
  Icon,
  Input,
  Select,
  ScrollView,
  NativeBaseProvider,
  useTheme,
  useToast,
} from "native-base";

export default function CreateRecordScreen({ navigation }: NativeStackScreenProps<CreateModalStackParamList, 'CreateRecordModal'>) {
  const theme = useTheme()
  const toast = useToast();

  const [opponent, setOpponent] = useState("")
  const [teamScore, setTeamScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)

  const [goal, setGoal] = useState(0)
  const [shoot, setShoot] = useState(0)
  const [assist, setAssist] = useState(0)
  const [playingTime, setPlayingTime] = useState(0)

  const setMatch = useSetRecoilState(matchState)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text fontSize={"lg"}>{i18n.t("close")}</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={Save}>
          <Text fontSize={"lg"}>{i18n.t("add")}</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation, opponent, teamScore, opponentScore, goal, shoot, assist, playingTime]);

  const Save = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

    const newMatch: MatchType = {
      type: MATCH_TYPE.公式戦,
      opponent: opponent,
      teamScore: teamScore,
      opponentScore: opponentScore,
      goal: goal,
      shoot: shoot,
      assist: assist,
      playingTime: playingTime,
    }

    setMatch((curVal) => {
      const newVal = curVal.concat(newMatch)
      return newVal
    })

    toast.show({
      render: () => (<CustomToast title="記録を追加しました" />),
      placement: "top",
      duration: 1500,
    })

    // モーダル閉じる
    navigation.popToTop();
  }

  const shouldSetResponse = () => true;
  const onRelease = () => (
    Keyboard.dismiss()
  );

  return (
    <NativeBaseProvider theme={theme}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={120}>
        <ScrollView>
          <VStack mt="4" space="2" onStartShouldSetResponder={shouldSetResponse} onResponderRelease={onRelease}>

            <HStack w="100%" alignItems={"center"} pl={2}>
              <Divider bg={"gray.400"} thickness="3" height="90%" orientation="vertical" mr={2} borderRadius="10" />
              <Text fontWeight="semibold" fontSize="2xl" _dark={{ color: "warmGray.100" }}>チーム</Text>
            </HStack>
            {/* 対戦相手 */}
            <HStack pl="2" py="2" alignItems={"center"}>
              <Box w="30%" justifyContent="center">
                <Text fontWeight="semibold" fontSize="md" _dark={{ color: "warmGray.100" }}>{i18n.t("opponent")}</Text>
              </Box>
              <Box w="70%" alignItems="center">
                <Select selectedValue={opponent} width="250" maxWidth="250" h={"12"} fontSize="md"
                  accessibilityLabel="Choose Region" placeholder={i18n.t("select_opponent")} _selectedItem={{
                    endIcon: <Icon as={Feather} size={6} name="check" />
                  }} mt={3} onValueChange={itemValue => setOpponent(itemValue)}>
                  <Select.Item label={"対戦相手A"} value={"対戦相手A"} />
                  <Select.Item label={"対戦相手B"} value={"対戦相手B"} />
                </Select>
              </Box>
            </HStack>
            <Divider w="95%" alignSelf={"center"} />

            {/* チーム結果 */}
            <HStack pl="2" py="2" alignItems={"center"}>
              <Box w="33%" justifyContent="center">
                <VStack alignItems={"center"}>
                  <Text fontWeight="semibold" fontSize="md" _dark={{ color: "warmGray.100" }}>あなたのチーム</Text>
                  <Input placeholder='0' variant="filled" width="100%" bg="gray.200" size="xl" borderRadius={15} mr={5}
                    bgColor="transparent" textAlign={'center'} borderColor='transparent' fontSize={20} maxLength={3}
                    onChangeText={(text) => setTeamScore(Number(text))} keyboardType="number-pad" />
                </VStack>
              </Box>
              <Box w="33%" justifyContent="center">
                <VStack alignItems={"center"}>
                  <Text fontWeight="semibold" fontSize="md" _dark={{ color: "warmGray.100" }}> </Text>
                  <Text fontWeight="semibold" fontSize="md" _dark={{ color: "warmGray.100" }}>-</Text>
                </VStack>
              </Box>
              <Box w="33%" alignItems="center">
                <Text fontWeight="semibold" fontSize="md" _dark={{ color: "warmGray.100" }}>{opponent}</Text>
                <Input placeholder='0' variant="filled" width="100%" bg="gray.200" size="xl" borderRadius={15} mr={5}
                  bgColor="transparent" textAlign={'center'} borderColor='transparent' fontSize={20} maxLength={3}
                  onChangeText={(text) => setOpponentScore(Number(text))} keyboardType="number-pad" />
              </Box>
            </HStack>
            <Divider w="95%" alignSelf={"center"} mb={10} />

            <HStack w="100%" alignItems={"center"} pl={2}>
              <Divider bg={"gray.400"} thickness="3" height="90%" orientation="vertical" mr={2} borderRadius="10" />
              <Text fontWeight="semibold" fontSize="2xl" _dark={{ color: "warmGray.100" }}>個人</Text>
            </HStack>

            {/* 得点 */}
            <HStack pl="2" py="2" alignItems={"center"}>
              <Box w="85%" justifyContent="center">
                <Text fontWeight="semibold" fontSize="md" _dark={{ color: "warmGray.100" }}>得点</Text>
              </Box>
              <Box w="15%" alignItems="center">
                <Input placeholder='0' variant="filled" width="100%" bg="gray.200" size="xl" borderRadius={15} mr={5}
                  bgColor="transparent" textAlign={'center'} borderColor='transparent' fontSize={20} maxLength={3}
                  onChangeText={(text) => setGoal(Number(text))} keyboardType="number-pad" />
              </Box>
            </HStack>
            <Divider w="95%" alignSelf={"center"} />

            {/* シュート数 */}
            <HStack pl="2" py="2" alignItems={"center"}>
              <Box w="85%" justifyContent="center">
                <Text fontWeight="semibold" fontSize="md" _dark={{ color: "warmGray.100" }}>シュート数</Text>
              </Box>
              <Box w="15%" alignItems="center">
                <Input placeholder='0' variant="filled" width="100%" bg="gray.200" size="xl" borderRadius={15} mr={5}
                  bgColor="transparent" textAlign={'center'} borderColor='transparent' fontSize={20} maxLength={3}
                  onChangeText={(text) => setShoot(Number(text))} keyboardType="number-pad" />
              </Box>
            </HStack>
            <Divider w="95%" alignSelf={"center"} />

            {/* アシスト */}
            <HStack pl="2" py="2" alignItems={"center"}>
              <Box w="85%" justifyContent="center">
                <Text fontWeight="semibold" fontSize="md" _dark={{ color: "warmGray.100" }}>アシスト</Text>
              </Box>
              <Box w="15%" alignItems="center">
                <Input placeholder='0' variant="filled" width="100%" bg="gray.200" size="xl" borderRadius={15} mr={5}
                  bgColor="transparent" textAlign={'center'} borderColor='transparent' fontSize={20} maxLength={3}
                  onChangeText={(text) => setAssist(Number(text))} keyboardType="number-pad" />
              </Box>
            </HStack>
            <Divider w="95%" alignSelf={"center"} />

            {/* 出場時間 */}
            <HStack pl="2" py="2" alignItems={"center"}>
              <Box w="85%" justifyContent="center">
                <Text fontWeight="semibold" fontSize="md" _dark={{ color: "warmGray.100" }}>出場時間</Text>
              </Box>
              <Box w="15%" alignItems="center">
                <Input placeholder='0' variant="filled" width="100%" bg="gray.200" size="xl" borderRadius={15} mr={5}
                  bgColor="transparent" textAlign={'center'} borderColor='transparent' fontSize={20} maxLength={3}
                  onChangeText={(text) => setPlayingTime(Number(text))} keyboardType="number-pad" />
              </Box>
            </HStack>
            <Divider w="95%" alignSelf={"center"} />

          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
}

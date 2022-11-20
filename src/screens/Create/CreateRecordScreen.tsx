import React, { useState, useLayoutEffect } from 'react';
import * as Localization from 'expo-localization';
import { Platform, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { CreateModalStackParamList } from 'src/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { format } from 'date-fns';

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
  Button,
  Text,
  Divider,
  Icon,
  Input,
  Select,
  ScrollView,
  NativeBaseProvider,
  useTheme,
  useToast,
  useColorMode,
} from "native-base";

const colorSchemes = {
  default: "muted",
  selected: "darkBlue",
}

export default function CreateRecordScreen({ navigation }: NativeStackScreenProps<CreateModalStackParamList, 'CreateRecordModal'>) {
  const { colorMode } = useColorMode();
  const theme = useTheme()
  const toast = useToast();

  const [showDatePicker, setShowDatePicker] = useState(false)

  const [targetDate, setTargetDate] = useState(new Date())
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
          <Text fontSize={"lg"} fontWeight="medium">{i18n.t("cancel")}</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={Save}>
          <Text fontSize={"lg"}>{i18n.t("add")}</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation, opponent, teamScore, opponentScore, goal, shoot, assist, playingTime]);

  const ShowDatePicker = () => {
    setShowDatePicker(!showDatePicker)
  }

  const onDatePickerChange = (_: DateTimePickerEvent, selectedDate: any) => {
    setTargetDate(selectedDate)
  }

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
      targetDate: targetDate,
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
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={110}>
        <ScrollView bg="gray.100">
          <VStack mt="4" space="2" onStartShouldSetResponder={shouldSetResponse} onResponderRelease={onRelease}>

            <Box bg="white" mx={2} px={3} borderRadius={15}>
              <HStack py="2" alignItems={"center"}>
                <Box w="60%" justifyContent="center">
                  <Text pl={2} fontWeight="normal" fontSize="md" _dark={{ color: "warmGray.100" }}>日付</Text>
                </Box>
                <Box w="40%" alignItems="flex-end">
                  <Button mr={2} w="24" size="md" variant="subtle" colorScheme={colorSchemes.default} onPress={ShowDatePicker}>
                    {format(new Date(targetDate), 'M月d日')}
                  </Button>
                </Box>
              </HStack>
              {(showDatePicker) && (
                <RNDateTimePicker locale={Localization.locale} display={"inline"} themeVariant="light" mode={"date"} value={targetDate} onChange={onDatePickerChange} />
              )}
            </Box>

            <HStack w="100%" alignItems={"center"} pl={2} mt={4}>
              <Divider bg={"red.300"} thickness="3" height="90%" orientation="vertical" mr={2} borderRadius="10" />
              <Text fontWeight="semibold" fontSize="lg" _dark={{ color: "warmGray.100" }}>チーム</Text>
            </HStack>

            <Box bg="white" mx={2} px={3} borderRadius={15}>
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
              <Divider alignSelf={"center"} bg="gray.100" />
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
            </Box>

            <HStack w="100%" alignItems={"center"} pl={2} mt={4}>
              <Divider bg={"red.300"} thickness="3" height="90%" orientation="vertical" mr={2} borderRadius="10" />
              <Text fontWeight="semibold" fontSize="lg" _dark={{ color: "warmGray.100" }}>個人</Text>
            </HStack>

            <Box bg="white" mx={2} px={3} borderRadius={15}>

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
              <Divider alignSelf={"center"} bg="gray.100" />

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
              <Divider alignSelf={"center"} bg="gray.100" />

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
              <Divider alignSelf={"center"} bg="gray.100" />

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
              <Divider alignSelf={"center"} bg="gray.100" />

            </Box>

          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
}

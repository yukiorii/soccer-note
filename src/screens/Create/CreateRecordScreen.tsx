import React, { useState, useLayoutEffect } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { CreateModalStackParamList } from 'src/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';

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
} from "native-base";

export default function CreateRecordScreen({ navigation }: NativeStackScreenProps<CreateModalStackParamList, 'CreateRecordModal'>) {
  const theme = useTheme()

  const [opponent, setOpponent] = useState("")
  const [teamScore, setTeamScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)

  const [goal, setGoal] = useState(0)
  const [shoot, setShoot] = useState(0)
  const [assist, setAssist] = useState(0)
  const [playingTime, setPlayingTime] = useState(0)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text fontSize={"lg"}>閉じる</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={Save}>
          <Text fontSize={"lg"}>保存</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const Save = () => {

  }

  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaView>
        <VStack mt="4" space="2">

          {/* 対戦相手 */}
          <HStack pl="2" py="2" alignItems={"center"}>
            <Box w="30%" justifyContent="center">
              <Text fontWeight="semibold" fontSize="md" _dark={{ color: "warmGray.100" }}>対戦相手</Text>
            </Box>
            <Box w="70%" alignItems="center">
              <Select selectedValue={opponent} width="250" maxWidth="250" h={"12"} fontSize="md"
                accessibilityLabel="Choose Region" placeholder="対戦相手を選択" _selectedItem={{
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
          <Divider w="95%" alignSelf={"center"} />

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
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

import React, { useLayoutEffect } from 'react';
import { SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import { MATCH_TYPE } from 'src/config/const';
import i18n from 'src/utils/i18n/i18n';

import {
  Box,
  VStack,
  Text,
  HStack,
  Pressable,
} from "native-base";

import { CreateModalStackParamList } from 'src/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export default function CreateRecordScreen({ navigation }: NativeStackScreenProps<CreateModalStackParamList, 'SelectCategoryModal'>) {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={Close}>
          <Text fontSize={"lg"}>{i18n.t("close")}</Text>
        </TouchableOpacity>
      )
    });
  }, []);

  const Close = () => {
    navigation.pop()
  }

  const OfficialGameButtonPressed = () => {
    navigation.navigate("CreateMatchModal", {
      matchType: MATCH_TYPE.公式戦,
    })
  }

  const PracticeGameButtonPressed = () => {
    navigation.navigate("CreateMatchModal", {
      matchType: MATCH_TYPE.練習試合,
    })
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <VStack mt={4} space={2} alignItems="center">

        <Pressable width={"80"} h={24} onPress={OfficialGameButtonPressed}>
          {({ isPressed }) => {
            return <Box bg={isPressed ? "coolGray.100" : "red.100"} width={"80"} h={24} borderRadius={20} p={4} justifyContent="center">
              <HStack justifyContent={"center"} alignItems="center">
                <MaterialCommunityIcons name="soccer-field" size={50} color="black" />
                <Text ml={2} fontWeight="medium" fontSize={24}>公式戦</Text>
              </HStack>
            </Box>
          }}
        </Pressable>

        <Pressable width={"80"} h={24} onPress={PracticeGameButtonPressed}>
          {({ isPressed }) => {
            return <Box bg={isPressed ? "coolGray.100" : "green.100"} width={"80"} h={24} borderRadius={20} p={4} justifyContent="center">
              <HStack justifyContent={"center"} alignItems="center">
                <Octicons name="people" size={50} color="black" />
                <Text ml={2} fontWeight="medium" fontSize={24}>練習試合</Text>
              </HStack>
            </Box>
          }}
        </Pressable>

        <Box bg="blue.100" width={"80"} h={24} borderRadius={20} p={4} justifyContent="center">
          <HStack justifyContent={"center"} alignItems="center">
            <MaterialCommunityIcons name="soccer" size={50} color="black" />
            <Text ml={2} fontWeight="medium" fontSize={24}>練習</Text>
          </HStack>
        </Box>

      </VStack>
    </SafeAreaView>
  );
}

import React from 'react';
import { Dimensions } from "react-native";

import { useRecoilValue } from 'recoil';
import { matchState } from 'src/atoms/MatchAtom';

import { MatchType } from 'src/types';

import {
  ScrollView,
  VStack,
} from 'native-base';

import {
  LineChart,
} from "react-native-chart-kit";

const RecordChart = (props: any) => {
  const allMatch = useRecoilValue(matchState)
  const reversedMatch = [...allMatch].reverse()

  const screenWidth = Dimensions.get("window").width;
  const shootData = {
    labels: reversedMatch.map((match: MatchType) => {
      return match.opponent
    }),
    datasets: [
      {
        data: reversedMatch.map((match: MatchType) => {
          return match.shoot
        }),
        color: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["シュート数"] // optional
  };
  const assistData = {
    labels: reversedMatch.map((match: MatchType) => {
      return match.opponent
    }),
    datasets: [
      {
        data: reversedMatch.map((match: MatchType) => {
          return match.assist
        }),
        color: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["アシスト数"] // optional
  };

  const chartConfig = {
    color: (opacity = 1) => `rgba(80, 80, 80, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
    backgroundColor: '#fff',
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
  };

  return <ScrollView>
    <VStack space={2} mt={4}>
      <LineChart
        data={shootData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        fromZero={true}
      />
      <LineChart
        data={assistData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        fromZero={true}
      />
    </VStack>
  </ScrollView>
}

export default RecordChart;
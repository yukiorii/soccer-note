import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TopTabBar from 'src/components/TopTabBar';
import RecordTable from 'src/components/Record/RecordTable';
import RecordChart from 'src/components/Record/RecordChart';

import {
  VStack,
  Button,
} from "native-base";

import { HomeStackParamList } from 'src/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export default function OfficialGameScreen({ navigation }: NativeStackScreenProps<HomeStackParamList, 'OfficialGame'>) {
  const Tab = createMaterialTopTabNavigator();

  return <Tab.Navigator keyboardDismissMode='on-drag' tabBar={props => <TopTabBar {...props} />}>
    <Tab.Screen name={"表"} component={RecordTable} />
    <Tab.Screen name={"グラフ"} component={RecordChart} />
  </Tab.Navigator>
}

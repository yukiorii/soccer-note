import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TopTabBar from 'src/components/TopTabBar';
import RecordTable from 'src/components/Record/RecordTable';
import RecordChart from 'src/components/Record/RecordChart';

import { MATCH_TYPE } from 'src/config/const';
import { HomeStackParamList } from 'src/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export default function OfficialGameScreen({ navigation }: NativeStackScreenProps<HomeStackParamList, 'OfficialGame'>) {
  const Tab = createMaterialTopTabNavigator();

  return <Tab.Navigator keyboardDismissMode='on-drag' tabBar={props => <TopTabBar {...props} />}>
    <Tab.Screen name={"表"} component={RecordTable} initialParams={{ type:MATCH_TYPE.公式戦 }} />
    <Tab.Screen name={"グラフ"} component={RecordChart} initialParams={{ type:MATCH_TYPE.公式戦 }} />
  </Tab.Navigator>
}

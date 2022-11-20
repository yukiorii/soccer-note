import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { useColorMode } from 'native-base';

import Colors, { lightTheme, darkTheme } from 'src/constants/Colors';
import useColorScheme from 'src/hooks/useColorScheme';

import HomeScreen from 'src/screens/Home/HomeScreen';
import OfficialGameScreen from 'src/screens/Home/OfficialGameScreen';
import CreateRecordScreen from 'src/screens/Create/CreateRecordScreen';
import SettingScreen from 'src/screens/Setting/SettingScreen';

import i18n from 'src/utils/i18n/i18n';

import {
  CreateModalStackParamList,
  HomeStackParamList,
  RootStackParamList,
  RootTabParamList,
} from 'src/types/index';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation() {
  const { colorMode } = useColorMode();
  const theme = (colorMode == 'light') ? lightTheme : darkTheme

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="CreateStack" component={CreateStackNavigator} options={{ headerShown: false }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: "ホーム", headerShown: false }} />
      <HomeStack.Screen name="OfficialGame" component={OfficialGameScreen} options={{ title: "公式戦", headerShown: true, headerBackTitleVisible: false }} />
    </HomeStack.Navigator>
  );
}

const CreateStack = createNativeStackNavigator<CreateModalStackParamList>();
function CreateStackNavigator() {
  return (
    <CreateStack.Navigator>
      <CreateStack.Screen name="CreateRecordModal" component={CreateRecordScreen} options={{ title: "記録追加", headerShown: true }} />
    </CreateStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();
function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={HomeStackNavigator}
        options={{
          title: i18n.t("home"),
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="CreateRecord"
        component={CreateStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            // @ts-ignore
            navigation.navigate('CreateStack', {
              screen: 'CreateRecordModal',
            });
          },
        })}
        options={{
          title: "登録",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          title: i18n.t("setting"),
          tabBarIcon: ({ color }) => <TabBarIcon name="settings" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) {
  return <Feather size={25} style={{ marginBottom: -3 }} {...props} />;
}

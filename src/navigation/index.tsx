/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
 import { Feather, FontAwesome } from '@expo/vector-icons';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import * as React from 'react';
 import { ColorSchemeName, Pressable } from 'react-native';
 
 import Colors from 'src/constants/Colors';
 import useColorScheme from 'src/hooks/useColorScheme';
 import ModalScreen from 'src/screens/ModalScreen';
 import NotFoundScreen from 'src/screens/NotFoundScreen';
 import TabOneScreen from '../screens/TabOneScreen';
 
 import CreateRecordScreen from 'src/screens/Create/CreateRecordScreen';
 import SettingScreen from 'src/screens/Setting/SettingScreen';
 
 import i18n from 'src/utils/i18n/i18n';

 import {
  CreateModalStackParamList,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps
} from 'src/types/index';
 import LinkingConfiguration from './LinkingConfiguration';
 
 export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
   return (
     <NavigationContainer
       linking={LinkingConfiguration}
       theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
       <RootNavigator />
     </NavigationContainer>
   );
 }
 
 const Stack = createNativeStackNavigator<RootStackParamList>();
 function RootNavigator() {
   return (
     <Stack.Navigator>
       <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
       <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
       <Stack.Group screenOptions={{ presentation: 'modal' }}>
         <Stack.Screen name="Modal" component={ModalScreen} />
         <Stack.Screen name="CreateStack" component={CreateStackNavigator} />
       </Stack.Group>

     </Stack.Navigator>
   );
 }

 const CreateStack = createNativeStackNavigator<CreateModalStackParamList>();
 function CreateStackNavigator() {
  return (
    <CreateStack.Navigator>
      <CreateStack.Screen name="CreateRecordModal" component={CreateRecordScreen} options={{ headerShown: false }} />
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
         component={TabOneScreen}
         options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
           title: 'ホーム',
           tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
           headerRight: () => (
             <Pressable
               onPress={() => navigation.navigate('Modal')}
               style={({ pressed }) => ({
                 opacity: pressed ? 0.5 : 1,
               })}>
               <FontAwesome
                 name="info-circle"
                 size={25}
                 color={Colors[colorScheme].text}
                 style={{ marginRight: 15 }}
               />
             </Pressable>
           ),
         })}
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
          title: "記録",
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
 
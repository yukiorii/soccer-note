import React from 'react';
import { Keyboard } from 'react-native';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { TabBar } from 'react-native-tab-view';

import {
  Text,
} from "native-base"

const TopTabBar = ({ state, descriptors, navigation, ...rest }: MaterialTopTabBarProps) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  return (
    <TabBar
      {...rest}
      navigationState={state}
      scrollEnabled={focusedOptions.tabBarScrollEnabled}
      bounces={focusedOptions.tabBarBounces}
      pressColor={focusedOptions.tabBarPressColor}
      pressOpacity={focusedOptions.tabBarPressOpacity}
      tabStyle={focusedOptions.tabBarItemStyle}
      indicatorContainerStyle={focusedOptions.tabBarIndicatorContainerStyle}
      contentContainerStyle={focusedOptions.tabBarContentContainerStyle}
      style={[{ backgroundColor: "white" }, focusedOptions.tabBarStyle]}
      getAccessibilityLabel={({ route }) =>
        descriptors[route.key].options.tabBarAccessibilityLabel
      }
      indicatorStyle={[
        { backgroundColor: "dodgerblue" },
        focusedOptions.tabBarIndicatorStyle,
      ]}
      getTestID={({ route }) => descriptors[route.key].options.tabBarTestID}
      onTabPress={({ route, preventDefault }) => {
        Keyboard.dismiss()
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (event.defaultPrevented) {
          preventDefault();
        }
      }}
      renderLabel={({ route, focused, color }) => {
        const { options } = descriptors[route.key];
        return (
          <Text color={(focused) ? "dodgerblue" : "gray.300"} style={{ fontSize: 15, fontWeight: "800" }}
            allowFontScaling={options.tabBarAllowFontScaling}
          >
            {route.name}
          </Text>
        );
      }
      }
    />
  );
}

export default TopTabBar;
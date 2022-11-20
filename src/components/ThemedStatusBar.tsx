import { StatusBar, useColorMode } from "native-base"

const ThemedStatusBar = () => {
  const { colorMode } = useColorMode();
  const barStyle = colorMode === "dark" ? "light-content" : "dark-content"
  return <StatusBar barStyle={barStyle} />
}

export default ThemedStatusBar;
import LoadingScreen from "@components/loadingscreen";
import { Slot, SplashScreen } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import {
  useFonts,
  Lato_400Regular,
  OpenSans_400Regular,
  Inter_900Black,
  NunitoSans_700Bold,
  Bangers_400Regular,
  NunitoSans_800ExtraBold
} from "@expo-google-fonts/dev";

SplashScreen.preventAutoHideAsync();

const AppLayout = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // before your app loads up.

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you do not want any extra delay
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  let [fontsLoaded] = useFonts({
    Inter: Inter_900Black,
    Sans: OpenSans_400Regular,
    Lato: Lato_400Regular,
    Nunlg: NunitoSans_800ExtraBold,
    bng: Bangers_400Regular,
  });

  if (!fontsLoaded) {
    // The native splash screen will stay visible for as long as there
    // are `<SplashScreen />` components mounted. This component can be nested.

    return <SplashScreen />;
  }
console.log("hel",fontsLoaded)
  return (
    <>
      {/* If app is ready (fonts loaded, API calls made, etc) then app loads else splash screen is shown */}
      {!appIsReady ? <LoadingScreen /> : <Slot />}
    </>
  );
};

export default AppLayout;

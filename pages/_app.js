// mock api
import "_apis_";

// scroll bar
import "simplebar/src/simplebar.css";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
import { Provider as AuthProvider } from "next-auth/client";

import { useEffect } from "react";
// next
import Head from "next/head";
// theme
import ThemeConfig from "src/theme";
// contexts
import { SettingsProvider } from "src/contexts/SettingsContext";
import { SnackbarProvider } from "notistack";

// components
import Settings from "src/components/settings";
import RtlLayout from "src/components/RtlLayout";
import TopProgressBar from "src/components/TopProgressBar";
import ThemePrimaryColor from "src/components/ThemePrimaryColor";

// ----------------------------------------------------------------------

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <SettingsProvider>
          <ThemeConfig>
            <ThemePrimaryColor>
              <RtlLayout>
                <Settings />
                <Head>
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                  />
                </Head>
                <TopProgressBar />
                <SnackbarProvider maxSnack={3}>
                  <Component {...pageProps} />
                </SnackbarProvider>
              </RtlLayout>
            </ThemePrimaryColor>
          </ThemeConfig>
        </SettingsProvider>
      </Provider>
    </AuthProvider>
  );
}

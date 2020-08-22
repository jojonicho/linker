import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";

import theme from "../theme";
import { withApollo } from "../utils/withApollo";
import { Navbar } from "../components/Navbar";
import { useMeQuery } from "../generated/graphql";

const MyApp = ({ Component, pageProps }: any) => {
  const { data: user, loading: userLoading } = useMeQuery();
  return (
    <ThemeProvider theme={theme}>
      {/* <ColorModeProvider> */}
      <CSSReset />
      <Navbar data={user!} loading={userLoading} />
      <Component {...pageProps} />
      {/* </ColorModeProvider> */}
    </ThemeProvider>
  );
};

export default withApollo({ ssr: false })(MyApp);
// export default MyApp;

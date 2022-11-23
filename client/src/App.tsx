import Main from "./components/Main";
import GlobalStyles from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { darkTheme, lightTheme } from "./styles/theme";
import Skeleton from "./components/Skeleton";

//11월의 행사 이런 문구 넣을 것

function App() {
  const [theme, setTheme] = useState<string>("dark");
  const isDark = theme === "dark";

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Main setTheme={setTheme} theme={theme} />
    </ThemeProvider>
  );
}

export default App;

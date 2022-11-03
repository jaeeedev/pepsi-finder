export const lightTheme = {
  bg: "#F8F9F4",
  text: "#222",
  itemBox: "#eee",
  switch: "#ccc",
};
//여기도 Theme 타입 잡아주면 순환참조 오류 뜸

export const darkTheme: Theme = {
  bg: "#222",
  text: "#eee",
  itemBox: "#444",
  switch: "#bbb",
};

export const theme = {
  lightTheme,
  darkTheme,
};

export type Theme = typeof lightTheme;

export default theme;

export const lightTheme = {
  bg: "#fff",
  text: "#222",
  itemBox: "#f4f6fa",
  switch: "#222",
  gs: ["#cce9f0", "#18a9ce"],
  cu: ["#ecd4f8", "#75299b"],
  se: ["#abe7d8", "green"],
  em: ["#ffeeb6", "#5b5e4c"],
  mi: ["#8dc1f5", "#1f5fa0"],
  cs: ["#fae594", "#9b6d09"],
  get1: ["#f8a49e", "#c72116"],
  get2: ["#d2d9ff", "#4e5eeb"],
};
//여기도 Theme 타입 잡아주면 순환참조 오류 뜸

export const darkTheme: Theme = {
  bg: "#222",
  text: "#eee",
  itemBox: "#444",
  switch: "#eee",
  gs: ["#29b4d3", "white"],
  cu: ["#6a3289", "white"],
  se: ["#007d5e", "white"],
  em: ["#f7b11b", "white"],
  mi: ["#1660a8", "white"],
  cs: ["#f4c300", "white"],
  get1: ["red", "white"],
  get2: ["#3150ff", "white"],
};

export const theme = {
  lightTheme,
  darkTheme,
};

export type Theme = typeof lightTheme;

export default theme;

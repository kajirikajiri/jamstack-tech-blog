import { createMuiTheme } from "@material-ui/core";

declare module "@material-ui/core/styles/createBreakpoints" {
  // https://jobotaku.com/ ← break point参考にした
  // https://stackoverflow.com/a/62605570 ← 型定義参考にした
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    s: true; // smart phone
    t: true; // tablet
    l: true; // laptop
    d: true; // desktop
  }
}

const theme = createMuiTheme({
  breakpoints: {
    values: {
      s: 0,
      t: 768,
      l: 1030,
      d: 1240,
    },
  },
});
export default theme;

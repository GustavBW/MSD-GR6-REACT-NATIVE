import { TextStyle } from "react-native";

export const Colors = {
    greenBase: {h:"119", s: "100", l: "72", hsl: "hsl(119, 100%, 72%)"},
    blueBase: {h: "187", s: "99", l: "67", hsl: "hsl(187, 99%, 67%)"},
    blueDark: {h: "187", s: "99", l: "25", hsl: "hsl(187, 99%, 25%)"},
    BlueAndGreen: ['#3498db', '#2ecc71']
    
};
export const StylingDefaults = {
    borderRadius: 10,
    iconSize: 40,
    colors: Colors,
    backgroundGradient: [Colors.blueBase.hsl, Colors.greenBase.hsl],
    fontSize: {
        title: 50,
    }
}
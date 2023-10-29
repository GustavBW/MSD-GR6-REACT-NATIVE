import { TextStyle } from "react-native";

export const Colors = {
    greenBase: {h:"119", s: "100", l: "72", hsl: "hsl(119, 100%, 72%)"},
    blueBase: {h: "187", s: "99", l: "67", hsl: "white"},
    blueDark: {h: "187", s: "99", l: "15", hsl: "hsl(187, 99%, 25%)"},
    BlueAndGreen: ['#3498db', 'hsl(145, 63%, 49%)'],
    test : [ '#1a4a6e', '#00bcd4']
    
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

// Refacotred styles and colors (29/10/2023):
export const RefactoredColors = {
    
}
export const RefactoredStyles = {

}
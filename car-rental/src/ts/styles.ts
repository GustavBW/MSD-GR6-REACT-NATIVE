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
    turquoiseLightBlue: '#46B8B9',
    turquoiseBaseBlue: '#467FB9',
    turquoiseGreen: '#46B980',
    white: '#FFFFFF',
    black: '#000000',
    red: '#FB5B5A'
}
export const RefactoredStyles = {
    borderRadius: {
        defaultBorderRadius: 15,
        buttonBorderRadius: 10,
        exitButtonBorderRadius: 15,
        inputBorderRadius: 5,
    },
    iconSize: 40,
    colors: RefactoredColors,
    backgroundGradient: [RefactoredColors.turquoiseLightBlue, RefactoredColors.turquoiseBaseBlue, RefactoredColors.turquoiseGreen],
    subGradient: [RefactoredColors.turquoiseGreen, RefactoredColors.turquoiseBaseBlue],
    fontSize: {
        title: 50,
        subtitle: 20,
        bodyText: 15,
        exitText: 20,
        buttonText: 15
    },
    fontWeight: {
        title: 'default' as 'normal',
        subtitle: 'bold' as 'bold',
        bodyText: 'default' as 'normal',
        exitText: 'bold' as 'bold',
        buttonText: 'bold' as 'bold'
    },
}
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';

export default function BlurPage(){
    return (
        <WebView
            style={{ 
                display: "absolute", 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                backgroundColor: "transparent"
            }}
            source={{ html: 
                '<div style="' +
                'position: absolute; top: 0; right:0; bottom: 0; left: 0;' +
                'background: rgba(255,255,255,0.2); backdrop-filter: blur(48px);' +
                '/*width:100%; height:100%; margin:0; padding:-10px;*/' +
                '"></div>'
            }}
            
        />

    )
}
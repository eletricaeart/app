

import React from "react";

import {
   PageFooter,
} from "@/src/widgets/clb-widgets";

import {
   StyleSheet,
   ScrollView,
   View,
   Text,
   Image,
} from "react-native";


export default function Budgets( { ...props } ) {


   return( <>
      <View style={ { flex: 1, backgroundColor: "#212329", } }>
         <Text style={ { flex: 1, color: "#fc0", } }>Orçamentos</Text>
         <PageFooter />
      </View>
   </> );
}


// import React, { useRef } from 'react';
// import { WebView } from 'react-native-webview';

// export default function Example() {
//   const webViewRef = useRef(null);
  
//   const htmlContent = `
//     <html>
//       <head>
//         <title>Example</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             background-color: #2E3440;
//             padding: 120px 24px;
//           }
//           h1 {
//             color: #fff;
//             font-size: 60px;
//           }
//           p {
//             color: #8f8f8f;
//             font-size: 36px;
//           }
//           button {
//             font-size: 36px;
//           }
//         </style>
//       </head>
//       <body>
//         <h1>Hello</h1>
//         <p>This is inline HTML content displayed in a WebView.</p>
//         <button id="myButton">Click me!</button>
//       </body>
//     </html>
//   `;
  
//   const customScript = `
//     document.getElementById('myButton').addEventListener('click', function() {
//       alert('Button clicked!');
//     });
//   `;
  
//   const handleWebViewLoad = () => {
//     webViewRef.current.injectJavaScript(customScript);
//   };
  
//   return (
//     <WebView
//       ref={webViewRef}
//       originWhitelist={['*']}
//       source={{ html: htmlContent }}
//       javaScriptEnabled={true}
//       onLoad={handleWebViewLoad}
//       style={{ flex: 1 }}
//     />
//   );
// }
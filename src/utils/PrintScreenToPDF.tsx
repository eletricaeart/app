

To print a screen into PDF in React Native using TypeScript, you can use the `react-native-pdf` library. First, you need to install the library by running:

```bash
npm install react-native-pdf
```

Then, you can create a component that will render the screen you want to print and save it as a PDF. Here is an example code snippet:

```typescript
import React from 'react';
import { View, Text, Button } from 'react-native';
import PDF from 'react-native-pdf';

const PrintScreenToPDF = () => {
  const pdfRef = React.createRef<PDF>();

  const handlePrintToPDF = () => {
    if (pdfRef.current) {
      pdfRef.current.save().then((filePath: string) => {
        console.log(`PDF saved to: ${filePath}`);
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>Hello, world!</Text>
      <Button title="Print to PDF" onPress={handlePrintToPDF} />
      <PDF
        ref={pdfRef}
        source={{ uri: 'http://example.com/sample.pdf', cache: true }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
          console.log(`File path: ${filePath}`);
        }}
      />
    </View>
  );
};

export default PrintScreenToPDF;
```

In this code snippet, we have created a component `PrintScreenToPDF` that renders a simple text and a button to trigger the printing to PDF functionality. We are using the `PDF` component from `react-native-pdf` to render the PDF and save it to a file.

Remember to replace the `source` prop in the `PDF` component with the content you want to print as a PDF. You can pass the HTML content or the URL of the web page you want to print.

When the user clicks the "Print to PDF" button, the `handlePrintToPDF` function is called, which saves the rendered content as a PDF file. The file path where the PDF is saved will be logged to the console.
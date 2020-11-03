Setup Chakra :

`yarn add @chakra-ui/core@next framer-motion`

Then in App.js :

```
import { ChakraProvider } from "@chakra-ui/core";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Test />
      </div>
    </ChakraProvider>
  );
}

export default App;
```

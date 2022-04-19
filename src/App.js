import React from 'react';
import { ChakraProvider, theme, Container} from '@chakra-ui/react';

import Products from './components/products';
import Footer from './components/footer';
import Header from './components/header';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container
        borderRadius="sm"
        maxWidth="container.xl"
        padding={4}
        bgColor="grey.500"
      >
        <Header />
        <Products />
        <Footer />
      </Container>
    </ChakraProvider>
  );
}

export default App;

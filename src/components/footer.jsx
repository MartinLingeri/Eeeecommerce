import React from 'react';
import { Stack, Divider, Heading } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Divider borderColor="gray.200" />
      <Heading as="h2" size="sm" fontWeight="semibold" textAlign="center">
        Este sitio NO es una pagina de compras real, fue realizada
        exclusivamente con un fin educativo
      </Heading>
    </Stack>
  );
}

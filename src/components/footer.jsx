import React from 'react';
import { Stack, Divider, Heading } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Divider borderColor="gray.200" />
      <Heading as="h2" size="sm" fontWeight="semibold" textAlign="center">
        Este sitio NO es utilizado como pagina de compras real, esta hecho solo con
        el fin de aprender mas sobre React y Chakra-UI
      </Heading>
    </Stack>
  );
}

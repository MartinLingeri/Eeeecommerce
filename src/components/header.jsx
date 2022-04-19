import React from 'react';
import {
  Box,
  Stack,
  Heading,
  Divider,
  Image,
  Text,
  IconButton,
  Link,
} from '@chakra-ui/react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import golDiegoIngleses from '../images/golDiegoIngleses.jpg';
import maradona from '../images/maradona.jpg';

export default function Header() {
  return (
    <>
      <Stack>
        <Image
          objectFit="cover"
          h="16rem"
          w="78rem"
          src={golDiegoIngleses}
          borderRadius="md"
        />
        <Stack direction={{ base: 'column', sm: 'row' }} alignItems="center" spacing={4}>
          <Box
            bgColor="white"
            borderRadius={9999}
            marginTop={-10}
            minWidth={32}
            padding={1}
          >
            <Image
              h={32}
              w={32}
              borderRadius={9999}
              objectFit="cover"
              src={maradona}
            />
          </Box>
          <Stack
            spacing={1}
            textAlign={{ base: 'center', sm: 'left' }}
            alignItems={{ base: 'center', sm: 'flex-start' }}
          >
            <Heading>Eeeecommerce</Heading>
            <Text color="gray.500">
              Productos de Diego Armando Maradona con la mejor calidad al mejor
              precio
            </Text>
            <Stack direction="row" pt={2}>
              <Box borderRadius={9999}>
                <IconButton
                  as={Link}
                  icon={<FaInstagram size={24}></FaInstagram>}
                  colorScheme="teal"
                  borderRadius={9999}
                  href="https://www.instagram.com/martin_lingeri/"
                  isExternal
                ></IconButton>
              </Box>
              <Box borderRadius={9999}>
                <IconButton
                  as={Link}
                  icon={<FaWhatsapp size={24}></FaWhatsapp>}
                  colorScheme="teal"
                  borderRadius={9999}
                  href="https://wa.me/541161295309"
                  isExternal
                ></IconButton>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Divider mt={4} borderColor="gray.200" />
    </>
  );
}

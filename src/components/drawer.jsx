import { useState, useEffect } from 'react';
import {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Stack,
  StackDivider,
  Box,
  Heading,
  Button,
  Link,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Divider,
  useMediaQuery,
  IconButton,
} from '@chakra-ui/react';
import { FaWhatsapp, FaPlus, FaMinus } from 'react-icons/fa';
import { parseCurrency } from './parseCurrency';

export default function ItemsDrawer({
  drawerIsOpen,
  drawerOnClose,
  btnRef,
  cart,
  cartTotal,
  itemsCount,
  wppText,
  handleAdd,
  handleRemove,
}) {
  //Tuve que hacer todo este quilombo porque el drawer no acepta tamaños responsive, tipo {{base:'full',sm:'xs'}}
  const [sizeDrawer, setSizeDrawer] = useState('xs');
  const [sizeButton, setSizeButton] = useState('md');
  const [isLargerThan400] = useMediaQuery('(min-width:400px)');

  useEffect(() => {
    if (isLargerThan400) {
      setSizeDrawer('sm');
    } else {
      setSizeDrawer('full');
    }
  }, [isLargerThan400]);

  useEffect(() => {
    if (isLargerThan400) {
      setSizeButton('lg');
    } else {
      setSizeButton('md');
    }
  }, [isLargerThan400]);
  //

  return (
    <Drawer
      size={sizeDrawer}
      isOpen={drawerIsOpen}
      placement="right"
      onClose={drawerOnClose}
      blockScrollOnMount={true}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader fontWeight="bold">Your Order</DrawerHeader>
        <DrawerBody>
          <Stack divider={<StackDivider borderColor="gray.200" />}>
            {cart.map((cartItem, index) => (
              <Box key={index}>
                <Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Heading as="h2" size="sm" fontWeight="semibold">
                      {cartItem.name}
                    </Heading>
                    <Text fontWeight="bold">
                      {parseCurrency(cartItem.price * cartItem.count)}
                    </Text>
                  </Stack>
                  <Stack direction="row" alignItems="center">
                    <Box>
                      <IconButton
                        icon={<FaMinus></FaMinus>}
                        colorScheme="teal"
                        alignItems="center"
                        color="white"
                        borderRadius={9999}
                        onClick={() => handleRemove(cartItem)}
                      ></IconButton>
                    </Box>
                    <Text>{cartItem.count}</Text>
                    <Box>
                      <IconButton
                        icon={<FaPlus></FaPlus>}
                        colorScheme="teal"
                        alignItems="center"
                        color="white"
                        borderRadius={9999}
                        onClick={() => handleAdd(cartItem)}
                      ></IconButton>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Stack>
        </DrawerBody>
        <DrawerFooter paddingInline={8}>
          <Stack w="100%">
            <Stack direction="row" justifyContent="space-between">
              <Text>Total</Text>
              <Text>{cartTotal}</Text>
            </Stack>
            <Divider />
            <Button
              as={Link}
              isExternal
              width="100%"
              size={sizeButton}
              boxShadow="lg"
              colorScheme="whatsapp"
              leftIcon={<FaWhatsapp />}
              href={`https://wa.me/541161295309?text=${encodeURIComponent(
                wppText
              )}`}
            >
              Order ({itemsCount} items)
            </Button>
          </Stack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

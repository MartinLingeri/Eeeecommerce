import { useState, useEffect, useRef, useMemo } from 'react';
import {
  Center,
  Stack,
  Heading,
  Text,
  Image,
  Grid,
  GridItem,
  Button,
  Link,
  Flex,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import Papa from 'papaparse';
import { FaPlus } from 'react-icons/fa';
import ItemsDrawer from './drawer';
import { parseCurrency } from './parseCurrency';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const text = useMemo(
    () =>
      cart
        .reduce(
          (message, product) =>
            message.concat(
              `*${product.name} (X${product.count}) - ${parseCurrency(
                product.price * product.count
              )}\n`
            ),
          ``
        )
        .concat(
          `\nTotal: ${parseCurrency(
            cart.reduce(
              (total, product) => total + product.price * product.count,
              0
            )
          )}`
        ),
    [cart]
  );
  const totalPrice = useMemo(
    () =>
      parseCurrency(
        cart.reduce(
          (totalPrice, product) => totalPrice + product.price * product.count,
          0
        )
      ),
    [cart]
  );

  const totalItems = useMemo(
    () => cart.reduce((totalItems, product) => totalItems + product.count, 0),
    [cart]
  );

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    await Papa.parse(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ798tUsc3O4KvsRe6Yh9gzcb7_ZZlZ5hsDZfwOh3ze1O6JfzyQl1Xv7bhhDtMItzRwOajvUzIrFya3/pub?output=csv',
      {
        download: true,
        header: true,
        complete: results => {
          const products = results.data;
          setProducts(
            products.map(product => ({
              ...product,
              price: Number(product.price),
            }))
          );
        },
        error: error => {
          console.log(error.message);
        },
      }
    );
  }

  function handleAdd(product) {
    const result = cart.find(p => {
      return p.name === product.name;
    });
    if (result) {
      const newCart = cart.map(p =>
        p.name === result.name ? { ...p, count: result.count + 1 } : p
      );
      setCart(newCart);
    } else {
      const newCartItem = { ...product, count: 1 };
      setCart([...cart, newCartItem]);
    }
  }

  function handleRemove(cartProduct) {
    const result = cart.find(p => {
      return p.name === cartProduct.name;
    });
    if (result.count - 1 === 0) {
      const cartProducts = cart.filter(p => p.name !== result.name);
      setCart(cartProducts);
      if (cart.length === 1 && isOpen) {
        onClose();
      }
    } else {
      const newCart = cart.map(p =>
        p.name === result.name ? { ...p, count: result.count - 1 } : p
      );
      setCart(newCart);
    }
  }

  return (
    <>
      <Center>
        <Stack marginBlock={6} spacing={8}>
          <Grid
            gridGap={4}
            templateColumns={{
              base: '1fr',
              lg: 'repeat(2, 1fr)',
              xl: 'repeat(3, 1fr)',
            }}
          >
            {products.map((product, index) => (
              <GridItem key={index}>
                <Stack
                  direction="row"
                  h="100%"
                  p={4}
                  backgroundColor="gray.100"
                  borderRadius={4}
                  borderColor="gray.200"
                  borderWidth={1}
                  spacing={{base:2, sm:4}}
                >
                  <Image
                    borderRadius="md"
                    h={128}
                    w={128}
                    objectFit="cover"
                    src={
                      'https://drive.google.com/uc?export=view&id=' +
                      product.drive_image_id
                    }
                  ></Image>
                  <Stack width="100%" justifyContent="space-between">
                    <Stack>
                      <Heading as="h2" size="md" fontWeight="semibold">
                        {product.name}
                      </Heading>
                      <Text color="gray.500">{product.description}</Text>
                    </Stack>
                    <Text fontWeight="bold">
                      {parseCurrency(product.price)}
                    </Text>
                  </Stack>
                  <IconButton
                    icon={<FaPlus></FaPlus>}
                    h="40px"
                    w="40px"
                    colorScheme="teal"
                    alignItems="center"
                    color="white"
                    borderRadius={9999}
                    onClick={() => {
                      handleAdd(product);
                    }}
                  ></IconButton>
                </Stack>
              </GridItem>
            ))}
          </Grid>
          {Boolean(cart.length) && (
            <Flex
              alignItems="center"
              justifyContent="center"
              bottom={0}
              p={4}
              position="sticky"
            >
              <Button
                as={Link}
                ref={btnRef}
                boxShadow="lg"
                isExternal
                colorScheme="teal"
                width={{ base: '100%', sm: 'fit-content' }}
                onClick={onOpen}
              >
                Ver Carrito ({totalItems} items) {totalPrice}
              </Button>
            </Flex>
          )}
        </Stack>
      </Center>
      <ItemsDrawer
        drawerIsOpen={isOpen}
        drawerOnClose={onClose}
        btnRef={btnRef}
        cart={cart}
        cartTotal={totalPrice}
        itemsCount={totalItems}
        wppText={text}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
      ></ItemsDrawer>
    </>
  );
}

/* eslint-disable @next/next/no-img-element */
import { Box, Center, Flex, Link } from '@chakra-ui/react';
import React from 'react';

export default function Layout({ children }) {
  return (
    <Box w="100vw">
      <Center as="head" mx="auto" pt={10}>
        <Link isExternal href="https://verbasa.com.br">
          <img
            src="/img/logo-verbasa.svg"
            alt="Verbasa logo"
            width="180px"
            height="100px"
          />
        </Link>
      </Center>
      {children}
    </Box>
  );
}

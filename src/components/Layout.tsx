/* eslint-disable @next/next/no-img-element */
import { Box, Center } from '@chakra-ui/react';
import React from 'react';

export default function Layout({ children }) {
  return (
    <Box w="100vw">
      <Center as="head" maxW="1120px" mx="auto" pt={10}>
        <a href="https://verbasa.com.br">
          <img src="/img/logo-verbasa.svg" alt="Verbasa logo" width="180px" />
        </a>
      </Center>
      {children}
    </Box>
  );
}

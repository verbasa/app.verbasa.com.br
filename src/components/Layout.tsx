/* eslint-disable @next/next/no-img-element */
import { Box, Center } from '@chakra-ui/react';
import React from 'react';

export default function Layout({ children }) {
  return (
    <Box maxW="1120px" wx="auto" p={4}>
      <Center as="head">
        <img src="/img/logo-verbasa.svg" alt="Verbasa logo" width="180px" />
      </Center>
      {children}
    </Box>
  );
}

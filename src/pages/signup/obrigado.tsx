import { Box, Button, Center, Flex } from '@chakra-ui/react';
import React, { useCallback, useRef, useState } from 'react';
import Layout from '../../components/Layout';

export default function Home() {
  return (
    <Layout key="HomePage">
      <Center py={10} h="100%" w="100%" overflow="hidden">
        Obrigado por se inscrever!
      </Center>
    </Layout>
  );
}

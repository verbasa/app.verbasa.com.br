import { Box, Button, Center, Flex } from '@chakra-ui/react';
import Layout from '../components/Layout';
import NextLink from 'next/link';

export default function Home() {
  return (
    <Layout key="HomePage">
      <Box textAlign="center" py={10} h="100%" w="100%" overflow="hidden">
        <p>Página inicial de aplicações da Verbasa.</p>
        <p>Clique na logo para ir para o site.</p>
        {/* <NextLink href="/rdSubscribe">
          <a>Subscribe test page</a>
        </NextLink> */}
      </Box>
    </Layout>
  );
}

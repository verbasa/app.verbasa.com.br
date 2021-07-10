import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import global from './global';
import { Button } from './components/Button';

const theme = extendTheme({
  colors,
  styles: {
    global,
  },
  fonts: {
    body: 'Open Sans',
  },
  components: {
    Button,
  },
});

export { theme };

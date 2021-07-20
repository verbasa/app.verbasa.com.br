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
    heading: 'Nunito',
    body: 'Nunito',
  },
  components: {
    Button,
  },
});

export { theme };

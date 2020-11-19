import {} from 'styled-components/cssprop';
import { Theme } from '../../src';
import 'styled-components/ts3.7/index';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

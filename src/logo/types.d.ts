import { Fits } from '../image/types';

interface LogoArgs {
  logo: string | Buffer;
  logoWidth: number;
  logoHeight: number;
  logoFit: Fits;
  width: number;
  height: number;
  logoPosition: string;
}

interface Logo {
  input: Buffer;
  left: number;
  top: number;
}

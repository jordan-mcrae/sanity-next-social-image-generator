import { Fits } from '../image/types';

interface LogoArgs {
  logoUrl: string;
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

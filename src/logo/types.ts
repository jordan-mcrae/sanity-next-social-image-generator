import { Fits } from '../image/types';

export interface LogoArgs {
  logo: string | Buffer;
  logoWidth: number;
  logoHeight: number;
  logoFit: Fits;
  width: number;
  height: number;
  logoPosition: string;
}

export interface Logo {
  input: Buffer;
  left: number;
  top: number;
}

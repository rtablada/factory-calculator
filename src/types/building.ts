import { HasId } from './const';

export interface Building extends HasId {
  name: string;

  maxInputs: number;
  maxOutputs: number;
  idlePower: number;
  workingPower: number;
}

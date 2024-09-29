import { HasId } from './const';

export interface Transport extends HasId {
  name: string;

  maxThroughput: number;
  idlePower?: number;
  workingPower?: number;
}

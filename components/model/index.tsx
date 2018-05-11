export interface Draw {
  id: number;
  drawStart: string;
  whiteResult: Array<string>;
  redResult: string;
  won: number;
  jackpot: number;
}

export interface Casino {
  id: number;
  label: string;
  jackpot: number;
}
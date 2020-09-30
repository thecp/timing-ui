export interface Starter {
  lastname: string;
  firstname: string;
  stno: number;
}

export interface Finisher extends Starter {
  netto: string;
}

export interface Block {
  id: number;
  startTime: string;
  starters: Starter[];
}

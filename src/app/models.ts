interface Athlete {
  name: string;
  stno: number;
}

export interface Starter extends Athlete {
  startTime: string;
}

export interface Finisher extends Athlete {
  time: string;
}

export interface Worker {
  id: number;
  publicId: number | null;
  firstName: string;
  lastName: string;
  preferredShift: string | null;
  preferredCoworkers: number[];
}

export interface WorkerOption {
  value: number;
  label: string;
}

export interface WorkerState {
  firstName: string;
  lastName: string;
  preferredShift?: string;
  preferredCoworkers: number[];
  workers: Worker[];
  options: WorkerOption[];
}

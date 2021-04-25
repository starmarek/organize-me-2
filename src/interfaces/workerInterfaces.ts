export interface Worker {
  id: number;
  public_id: number | null;
  first_name: string;
  last_name: string;
  preferred_shift: string | null;
  preferred_coworkers: number[];
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

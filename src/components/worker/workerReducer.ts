import { Worker, WorkerOption } from './workerInterfaces';

interface State {
  firstName: string;
  lastName: string;
  preferredShift?: string;
  preferredCoworkers: number[];
  workers: Worker[];
  options: WorkerOption[];
}

interface FormAction {
  type: string;
  value?: string | string[] | number | number[] | Worker[] | WorkerOption[];
}

export const initialState: State = {
  firstName: '',
  lastName: '',
  preferredShift: undefined,
  preferredCoworkers: [],
  workers: [],
  options: [],
};

export const reducer = (state: State, action: FormAction) => {
  if (action.type === 'reset') {
    return initialState;
  }

  const result: State = { ...state };
  result[action.type] = action.value;
  return result;
};

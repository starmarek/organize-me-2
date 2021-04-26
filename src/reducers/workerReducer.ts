import {
  Worker,
  WorkerState,
  WorkerOption,
} from '../interfaces/workerInterfaces';
import { FormAction } from '../interfaces/genericInterfaces';

export const initialState: WorkerState = {
  firstName: '',
  lastName: '',
  preferredShift: undefined,
  preferredCoworkers: [],
  workers: [],
  options: [],
};

export const handleReactSelectChange = (
  opts: WorkerOption[],
  dispatchFunc: React.Dispatch<FormAction<number[]>>,
  actionType: string
) => {
  dispatchFunc({
    type: actionType,
    value: opts.map((opt: WorkerOption) => opt.value),
  });
};

export const reducer = (
  state: WorkerState,
  action: FormAction<string | number[] | Worker[] | WorkerOption[]>
) => {
  if (action.type === 'reset') {
    return initialState;
  }

  const result: WorkerState = { ...state };
  result[action.type] = action.value;
  return result;
};

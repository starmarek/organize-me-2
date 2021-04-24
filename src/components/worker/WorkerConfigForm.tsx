import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';

import { Worker, WorkerOption } from './workerInterfaces';
import { reducer, initialState } from './workerReducer';
import workersApi from '../../api/workersAPI';

const WorkerConfigForm = () => {
  const history = useHistory();
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    () => initialState
  );

  const {
    firstName,
    lastName,
    preferredShift,
    preferredCoworkers,
    workers,
    options,
  } = state;

  const createOptions = (workersList: Worker[]) => {
    const opt: WorkerOption[] = [];
    workersList.forEach((worker) => {
      opt.push({
        value: worker.id,
        label: worker.public_id
          ? `${worker.first_name} ${worker.last_name} (${worker.public_id})`
          : `${worker.first_name} ${worker.last_name}`,
      });
    });

    return opt;
  };

  const addWorker = () => {
    workersApi
      .addWorker({
        first_name: firstName,
        last_name: lastName,
        preferred_shift: preferredShift,
        preferred_coworkers: preferredCoworkers,
      })
      .then((res) => res)
      .catch((err) => {
        throw err;
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    dispatch({ type: name, value });
  };

  const handleCustomSelectChange = (opts: WorkerOption[]) => {
    dispatch({
      type: 'preferredCoworkers',
      value: opts.map((opt: WorkerOption) => opt.value),
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addWorker();
    dispatch({ type: 'reset' });
    history.push('/');
  };

  useEffect(() => {
    workersApi
      .fetchWorkers()
      .then((wrk: Worker[]) => dispatch({ type: 'workers', value: wrk }))
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    dispatch({ type: 'options', value: createOptions(workers) });
  }, [workers]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="columns">
          <div className="column is-4">
            <div className="field">
              <div className="label">Imię</div>
              <div className="control">
                <input
                  required
                  className="input"
                  type="text"
                  placeholder="Wprowadź imię"
                  value={firstName}
                  name="firstName"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div className="field">
              <div className="label">Nazwisko</div>
              <div className="control">
                <input
                  required
                  className="input"
                  type="text"
                  placeholder="Wprowadź nazwisko"
                  value={lastName}
                  name="lastName"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="label">Preferowana zmiana</div>
          <div className="control">
            <div className="select">
              <select
                value={preferredShift}
                name="preferredShift"
                onChange={handleChange}
              >
                <option value={undefined}>Brak</option>
                <option value="D">Dzienna</option>
                <option value="N">Nocna</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="label">Preferowani współpracownicy</div>
          <div className="control">
            <Select
              isMulti
              options={options}
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              name="preferredCoworkers"
              onChange={handleCustomSelectChange}
            />
          </div>
        </div>
        <div className="field is-grouped is-grouped-right">
          <p className="control">
            <button className="button is-primary" type="submit">
              Dodaj
            </button>
          </p>
          <p className="control">
            <button
              className="button is-light"
              type="button"
              onClick={() => history.push('/')}
            >
              Anuluj
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default WorkerConfigForm;

import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import workersApi from '../../api/workersAPI';

interface WorkerOption {
  value: number;
  label: string;
}

// TODO check useReducer hook
const UserConfigForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [preferredShift, setPreferredShift] = useState(undefined);
  const [preferredCoworkers, setPreferredCoworkers] = useState([]);

  const [workers, setWorkers] = useState([]);
  const [options, setOptions] = useState<WorkerOption>();

  const createOptions = (workersList) => {
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

  const addWorker = (event) => {
    event.preventDefault();
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

  useEffect(() => {
    workersApi
      .fetchWorkers()
      .then((wrk) => setWorkers(wrk))
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    setOptions(createOptions(workers));
  }, [workers]);

  return (
    <div>
      <form onSubmit={addWorker}>
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
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
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
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
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
                onChange={(event) => {
                  setPreferredShift(event.target.value);
                }}
              >
                <option>Brak</option>
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
              onChange={(opts) =>
                setPreferredCoworkers(opts.map((opt) => opt.value))
              }
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
            <button className="button is-light" type="button">
              Anuluj
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default UserConfigForm;

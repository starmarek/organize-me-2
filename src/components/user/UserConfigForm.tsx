import React, { useState, useEffect } from 'react';

import Select from 'react-select';

const UserConfigForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [preferredShift, setPreferredShift] = useState('');
  const [preferredCoworkers, setPreferredCoworkers] = useState([]);

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const addWorker = (event) => {
    event.preventDefault();
    console.log({ firstName, lastName, preferredShift, preferredCoworkers });
  };

  return (
    <div>
      <form onSubmit={addWorker}>
        <div className="columns">
          <div className="column is-4">
            <div className="field">
              <div className="label">Imię</div>
              <div className="control">
                <input
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
                <option value="">Brak</option>
                <option value="day">Dzienna</option>
                <option value="night">Nocna</option>
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
              onChange={setPreferredCoworkers}
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

import React from 'react';
import TagsInput from '../tags_input/TagsInput';

const UserConfigForm = () => {
  return (
    <div>
      <form>
        <div className="columns">
          <div className="column is-4">
            <div className="field">
              <div className="label">Imię</div>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Wprowadź imię"
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
                />
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-8">
            <div className="field">
              <div className="label">Nazwisko</div>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Wprowadź nazwisko"
                />
              </div>
            </div>
          </div>
        </div>
        <TagsInput id="tags-input" value="3" />
      </form>
    </div>
  );
};

export default UserConfigForm;

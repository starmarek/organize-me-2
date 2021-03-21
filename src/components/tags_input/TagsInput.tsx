import React, { useState, useEffect, useRef } from 'react';

import BulmaTagsInput from '@creativebulma/bulma-tagsinput';
// const BulmaTagsInput = require('@creativebulma/bulma-tagsinput');

interface Props {
  id: string;
  value: string;
  allowDuplicates?: boolean;
  caseSensitive?: boolean;
  clearSelectionOnTyping?: boolean;
  closeDropdownOnItemSelect?: boolean;
  delimiter?: string;
  freeInput?: boolean;
  highlightDuplicate?: boolean;
  highlightMatchesString?: boolean;
  itemValue?: string;
  itemText?: string;
  maxTags?: number;
  maxChars?: number;
  minChars?: number;
  noResultsLabel?: string;
  placeholder?: string;
  removable?: boolean;
  searchMinChars?: number;
  searchOn?: string;
  selectable?: boolean;
  source?: Array<string>;
  tagClass?: string;
  trim?: boolean;
}

const defaultProps = {
  allowDuplicates: false,
  caseSensitive: true,
  clearSelectionOnTyping: false,
  closeDropdownOnItemSelect: true,
  delimiter: ',',
  freeInput: true,
  highlightDuplicate: true,
  highlightMatchesString: true,
  itemValue: undefined,
  itemText: undefined,
  maxTags: undefined,
  maxChars: undefined,
  minChars: 1,
  noResultsLabel: 'No results found',
  placeholder: '',
  removable: true,
  searchMinChars: 1,
  searchOn: 'text',
  selectable: true,
  source: undefined,
  tagClass: 'is-rounded',
  trim: true,
};

const TagsInput: React.FC<Props> = (props) => {
  const [value, setValue] = useState('');
  const [tagsInputInstance, setTagsInputInstance] = useState(null);

  const tagsInput = useRef(null);

  const { id, placeholder } = props;

  useEffect(() => {
    console.log(tagsInput.current);
    setTagsInputInstance(new BulmaTagsInput(tagsInput.current));
  }, []);

  return (
    <input
      ref={tagsInput}
      id={id}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

TagsInput.defaultProps = defaultProps;

export default TagsInput;

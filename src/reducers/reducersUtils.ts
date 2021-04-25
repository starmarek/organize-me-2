import React from 'react';
import { FormAction } from '../interfaces/genericInterfaces';

// eslint-disable-next-line import/prefer-default-export
export function handleChange<Type>(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  dispatchFunc: React.Dispatch<FormAction<Type>>
) {
  const { name, value } = e.target;
  dispatchFunc({ type: name, value });
}

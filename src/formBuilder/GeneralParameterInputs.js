// @flow

import * as React from 'react';
import { getCardBody } from './utils';
import type { Parameters, Mods } from './types';

// specify the inputs required for any type of object
export default function GeneralParameterInputs({
  category,
  parameters,
  onChange,
  mods,
}: {
  category: string,
  parameters: Parameters,
  onChange: (newParams: Parameters) => void,
  mods?: Mods,
}) {
  return (
    <div>{getCardBody(category, mods)({ parameters, onChange, mods })}</div>
  );
}

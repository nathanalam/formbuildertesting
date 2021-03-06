// @flow

import React from 'react';
import { Input } from 'reactstrap';
import {
  generateElementComponentsFromSchemas,
  generateCategoryHash,
} from '../utils';
import type { Parameters, Mods } from '../types';

// specify the inputs required for a string type object
function CardArrayParameterInputs({
  parameters,
  onChange,
}: {
  parameters: Parameters,
  onChange: ({ [string]: any }) => void,
}) {
  return (
    <div>
      <h4>Minimum Items</h4>
      <Input
        value={parameters.minItems || ''}
        placeholder="ex: 2"
        key="minimum"
        type="number"
        onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
          onChange({
            ...parameters,
            minItems: parseInt(ev.target.value, 10),
          });
        }}
        className="card-modal-number"
      />
      <h4>Maximum Items</h4>
      <Input
        value={parameters.maxItems || ''}
        placeholder="ex: 2"
        key="maximum"
        type="number"
        onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
          onChange({
            ...parameters,
            maxItems: parseInt(ev.target.value, 10),
          });
        }}
        className="card-modal-number"
      />
    </div>
  );
}

function InnerCard({
  parameters,
  onChange,
  mods,
}: {
  parameters: Parameters,
  onChange: (newParams: Parameters) => void,
  mods?: Mods,
}) {
  const newDataProps = {};
  const newUiProps = {};
  // parse components into data and ui relevant pieces
  Object.keys(parameters).forEach((propName) => {
    if (propName.startsWith('ui:*')) {
      newUiProps[propName.substring(4)] = parameters[propName];
    } else if (propName.startsWith('ui:')) {
      newUiProps[propName] = parameters[propName];
    } else if (!['name', 'required', 'lang'].includes(propName)) {
      newDataProps[propName] = parameters[propName];
    }
  });

  const definitionData = parameters.definitionData
    ? parameters.definitionData
    : {};
  const definitionUi = parameters.definitionUi ? parameters.definitionUi : {};
  const [cardOpen, setCardOpen] = React.useState(false);
  if (parameters.type !== 'array') {
    return <h4>Not an array </h4>;
  }
  return (
    <div className="card-array">
      {generateElementComponentsFromSchemas({
        schemaData: { properties: { Item: newDataProps.items } },
        uiSchemaData: { Item: newUiProps.items },
        onChange: (schema, uischema) => {
          onChange({
            ...parameters,
            items: schema.properties.Item,
            'ui:*items': uischema.Item || {},
          });
        },
        language: 'json',
        path: typeof parameters.path === 'string' ? parameters.path : 'array',
        definitionData:
          typeof definitionData === 'string' ? definitionData : {},
        definitionUi: typeof definitionUi === 'string' ? definitionUi : {},
        hideKey: true,
        cardOpenArray: [cardOpen],
        setCardOpenArray: (newArr) => setCardOpen(newArr[0]),
        mods,
        categoryHash: generateCategoryHash(mods),
      })}
    </div>
  );
}

const ArrayInputs = {
  array: {
    displayName: 'Array',
    matchIf: [
      {
        types: ['array'],
      },
    ],
    defaultDataSchema: {
      items: { type: 'string' },
    },
    defaultUiSchema: {},
    type: 'array',
    cardBody: InnerCard,
    modalBody: CardArrayParameterInputs,
  },
};

export default ArrayInputs;

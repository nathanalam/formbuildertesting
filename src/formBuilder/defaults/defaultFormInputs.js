// @flow
import ShortAnswerInputs from './ShortAnswerInputs';
import LongAnswerInputs from './LongAnswerInputs';
import NumberInputs from './NumberInputs';
import ArrayInputs from './ArrayInputs';
import DefaultInputs from './DefaultInputs';
import type { FormInput } from '../types';

const DEFAULT_FORM_INPUTS = ({
  ...DefaultInputs,
  ...ShortAnswerInputs,
  ...LongAnswerInputs,
  ...NumberInputs,
  ...ArrayInputs,
}: { [string]: FormInput });

export default DEFAULT_FORM_INPUTS;

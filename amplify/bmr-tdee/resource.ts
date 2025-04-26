import { defineFunction } from '@aws-amplify/backend';

export const tdeeCalculator = defineFunction({
  name: 'tdeeCalculator',
  entry: './src/index.py',
});
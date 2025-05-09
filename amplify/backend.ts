import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
// import { data } from './data/resource';
import { sayHello } from './functions/say-hello/resource';
import { bmrTdeeCalculator } from './functions/bmr-tdee/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  auth,
  // data,
  sayHello,
  bmrTdeeCalculator,
});

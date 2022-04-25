// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ASKNFTEA } = initSchema(schema);

export {
  ASKNFTEA
};
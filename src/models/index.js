// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { NFTSQL } = initSchema(schema);

export {
  NFTSQL
};
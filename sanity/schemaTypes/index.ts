import { type SchemaTypeDefinition } from 'sanity'
import { destination } from './destination'
import { packageType } from './package'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [destination, packageType],
}

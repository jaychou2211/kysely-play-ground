import { jsonArrayFrom } from 'kysely/helpers/postgres'
import { db } from './database'
import * as PersonRepository from './PersonRepository'

async function main() {
  const people = await db
    .selectFrom('persons')
    .selectAll('persons')
    .select((eb) => [
      jsonArrayFrom(
        eb.selectFrom('pets')
          .select(['pets.id', 'pets.name'])
          .whereRef('pets.owner_id', '=', 'persons.id')
          .orderBy('pets.name')
      ).as('pets'),
    ])
    .executeTakeFirstOrThrow()

  console.log(people)

  const person2 = await PersonRepository.findPersonById(1)
  console.log(person2)
}

main()
import { jsonArrayFrom } from 'kysely/helpers/postgres'
import { db } from './database'
import * as PersonRepository from './PersonRepository'

async function main() {
  const people = await db
    .selectFrom('person')
    .selectAll('person')
    .select((eb) => [
      jsonArrayFrom(
        eb.selectFrom('pet')
          .select(['pet.id', 'pet.name'])
          .whereRef('pet.owner_id', '=', 'person.id')
          .orderBy('pet.name')
      ).as('pets'),
    ])
    .executeTakeFirstOrThrow()

  console.log(people)

  const person2 = await PersonRepository.findPersonById(1)
  console.log(person2)
}

main()
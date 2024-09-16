import { db } from './database'
import { PersonUpdate, Person, NewPerson } from './types'

export async function findPersonById(id: number) {
  return await db
    .selectFrom('persons')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst()
}

export async function findPeople(criteria: Partial<Person>) {
  let query = db.selectFrom('persons')

  if (criteria.id) {
    query = query.where('id', '=', criteria.id) // Kysely is immutable, you must re-assign!
  }

  if (criteria.first_name) {
    query = query.where('first_name', '=', criteria.first_name)
  }

  if (criteria.last_name !== undefined) {
    query = query.where(
      'last_name',
      criteria.last_name === null ? 'is' : '=',
      criteria.last_name
    )
  }

  if (criteria.gender) {
    query = query.where('gender', '=', criteria.gender)
  }

  if (criteria.created_at) {
    query = query.where('created_at', '=', criteria.created_at)
  }

  return query.selectAll().execute();
}

export async function updatePerson(id: number, updateWith: PersonUpdate) {
  await db
    .updateTable('persons')
    .set(updateWith)
    .where('id', '=', id)
    .execute()
}

export async function createPerson(person: NewPerson) {
  return await db
    .insertInto('persons')
    .values(person)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function deletePerson(id: number) {
  return await db
    .deleteFrom('persons')
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst()
}
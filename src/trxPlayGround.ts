import { jsonArrayFrom } from "kysely/helpers/postgres";
import { db } from "./database"

db.transaction().execute(async trx => {
  const jennifer = await trx
    .insertInto('persons')
    .values({
      first_name: 'Jennifer',
      last_name: 'Aniston',
      gender: 'woman',
      metadata: JSON.stringify({
        login_at: new Date().toISOString(),
        ip: '127.0.0.1',
        agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
        plan: 'free'
      })
    })
    .returning('id')
    .executeTakeFirstOrThrow();

  await trx
    .insertInto('pets')
    .values({
      owner_id: jennifer.id,
      name: 'Catto',
      species: 'cat',
    })
    .returningAll()
    .executeTakeFirst();

  return trx
    .selectFrom('persons')
    .selectAll('persons')
    .select((eb) => [
      jsonArrayFrom(
        eb.selectFrom('pets')
          .select(['pets.id', 'pets.name', 'pets.species'])
          .whereRef('pets.owner_id', '=', 'persons.id')
      ).as('pets'),
    ])
    .where('persons.id', '=', jennifer.id)
    .executeTakeFirstOrThrow();
})
  .then(console.log)
  .catch(console.error);
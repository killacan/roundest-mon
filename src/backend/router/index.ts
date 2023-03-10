import { z } from 'zod';
import { procedure, router } from '../trpc';
import * as trpc from '@trpc/server';
import { prisma } from '@/backend/utils/prisma';

export const appRouter = router({
  castVote: procedure
    .input(z.object({ votedFor: z.number(), votedAgainst: z.number() }))
    .mutation(async ({ input }) => {

      const voteInDb = await prisma.vote.create({
        data: {
          votedAgainstId: input.votedAgainst,
          votedForId: input.votedFor,
        }
      })
      return {success: true, vote: voteInDb}
    }),
  getPokemon: procedure.input(z.object({ id: z.number() }))
    .query(async ({input}) => {

    const pokemon = await prisma.pokemon.findFirst({ where: { id: input.id } });

    if (!pokemon) throw new Error("lol does not exist")
    return pokemon;
  }),

});


export type AppRouter = typeof appRouter;






// export const appRouter = router({
//   getPokemonById: procedure
//   .input(
//     z.object({
//       id: z.number(),
//     }),
//     )
//     .query(({ input }) => {
//       const api = new PokemonClient()
      
//       return {
//         pokemon: api.getPokemonById(input.id)
//       }
      
//     }),
// });

// export const appRouter = trpc.router().query('get-pokemon-by-id', {
//   input: z.object({id: z.number()}),
//   async resolve({input}) {
//     const api = new PokemonClient();

//     const pokemon = await api.getPokemonById(input.id);
//     return pokemon;
//   },
// })

  // router({
  // hello: procedure
  //   .input(
  //     z.object({
  //       text: z.string(),
  //     }),
  //   )
  //   .query(({ input }) => {
  //     return {
  //       greeting: `hello ${input.text}`,
  //     };
  //   }),
  // });
// export type definition of API
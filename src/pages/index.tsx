import Head from 'next/head'
import { trpc } from '@/utils/trpc';
import { getOptionsForVote } from '@/utils/getRandomPokemon';
import { useState } from 'react';

export default function Home () {

  const [ids, updateIds] = useState(getOptionsForVote());

  const [first, second] = ids;

  // console.log(first, second)

  // const firstPokemon = trpc.useQuery("get-pokemon-by-id", { id: first });
  const firstPokemon = trpc.getPokemon.useQuery({ id: first });
  const secondPokemon = trpc.getPokemon.useQuery({ id: second });

  if (firstPokemon.isLoading || secondPokemon.isLoading) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Roundest Mon Test</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <div className='h-screen w-screen flex flex-col justify-center align-middle items-center' >
          <div className='text-2xl text-center' >Which Pokemon is Rounder?</div>
          <div className='p-2' />
          <div className='border rounded p-8 flex justify-between items-center max-w-2xl' >
            <div className='w-64 h-64 bg-red-800'><img src={firstPokemon.data?.sprites.front_default} className="w-full"/></div>
            <div className='p-8'>VS</div>
            <div className='w-64 h-64 bg-red-800'><img src={secondPokemon.data?.sprites.front_default} className="w-full"/></div>
          </div>

        </div>

      </main>
    </>
  )
}
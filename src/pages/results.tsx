import type { GetServerSideProps } from "next";
import { prisma } from "@/backend/utils/prisma";
import { inferAsyncReturnType } from "@trpc/server";
import { AsyncReturnType } from "@/utils/ts-bs";

import Image from "next/image";
import Link from "next/link";

const getPokemonInOrder = async () => {
    const pokemonOrdered = await prisma.pokemon.findMany({
        orderBy: {
            VoteFor: {
                _count: "desc"
            }
        },
        select: {
            id: true, 
            name: true, 
            spriteUrl: true,
            _count: {
                select: {
                    VoteFor: true,
                    VoteAgainst: true
                }
            }
        }
    });

    return pokemonOrdered;
}

type PokemonQueryResult = AsyncReturnType<typeof getPokemonInOrder>;

const generateCountPercent = (pokemon: PokemonQueryResult[number]) => {
    const {VoteFor, VoteAgainst} = pokemon._count;
    if (VoteFor + VoteAgainst === 0) return 0;
    return VoteFor / (VoteFor + VoteAgainst) * 100;  
}

const PokemonListing: React.FC<{pokemon: PokemonQueryResult[number] }> = ({ pokemon }) => {
    return (
        <div className="flex border-b p-4 justify-between">
            <div className="flex items-center" >
                <Image 
                    width={64} 
                    height={64} 
                    alt="" 
                    src={pokemon.spriteUrl!} 
                />
                <div className="capitalize px-5" >{pokemon.name}</div>
            </div>
            <div className="flex items-center justify-end p-5" >
                {generateCountPercent(pokemon) + "%" }
            </div>
        </div>

    )
}

const ResultsPage: React.FC<{pokemon: AsyncReturnType<typeof getPokemonInOrder>}> = (props) => {
    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-3 w-full max-w-2xl">
                <Link className="underline my-auto px-4 w-4" href="/" >Back</Link>
                <h2 className="text-2xl text-center ">Results</h2>
            </div>
            <div className="flex flex-col w-full max-w-2xl border">
                {props.pokemon.map((pokemon, index) => {
                    return <PokemonListing pokemon={pokemon} key={index} />
                })}
            </div>
        </div>
    )
}

export default ResultsPage;


export const getStaticProps: GetServerSideProps = async () => {
    
    const DAY_IN_SECONDS = 60 * 60 * 24;
    const pokemonOrdered = await getPokemonInOrder();

    console.log(pokemonOrdered)

    return { props: { pokemon: pokemonOrdered }, revalidate: 60}
    // return { props: { pokemon: pokemonOrdered }, revalidate: DAY_IN_SECONDS };
};
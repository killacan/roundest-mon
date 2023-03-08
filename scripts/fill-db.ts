
import { prisma } from "../src/backend/utils/prisma";
import { PokemonClient } from "pokenode-ts";

const doBackfill = async () => {
    const api = new PokemonClient();

    const allPokemon = await api.listPokemons(0, 493);

    const formattedPokemon = allPokemon.results.map((p, index) => ({
        id: index + 1,
        name: (p as {name: string}).name,
        spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }));

    const creation = await prisma.pokemon.createMany({
        data: formattedPokemon,
    });

    console.log("Creation", creation);
}

doBackfill();
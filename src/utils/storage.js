export const savePokemons = (list) => {
    localStorage.setItem('pokemons_list', JSON.stringify(list))
}

export const verifyPokemons = () => {
    let savedPokemonsList = localStorage.getItem('pokemons_list')
    return JSON.parse(savedPokemonsList)
}
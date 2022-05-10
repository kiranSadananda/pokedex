import React, { useEffect, useState }  from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Search from "../components/extras/Search";
import Header from "../components/Header/Header";
import LoadingCard from "../components/Loading/LoadingCard";
import PokeCard from "../components/Pokemon/PokeCard";
import api from "../services/api";
import { savePokemons, verifyPokemons } from "../utils/storage";
let pokemonsList = [];
const perPage = 152;
const limit = 152; 
let max = 0;
const Home = ({history, ...props}) => {
    const { query } = props.match.params;
    const [loading, setLoading] = useState(true)
    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        setLoading(true)
        let LocalPokeList = verifyPokemons()
        if(LocalPokeList === null) {
            loadPokemons()
            return false
        }
        pokemonsList = LocalPokeList
        handleResult(pokemonsList.length, pokemonsList.slice(0, perPage));
        setLoading(false);
    }, []);

    useEffect(() => {
        setLoading(true);
        if (query === undefined) {
            handleResult(
                pokemonsList.length,
                pokemonsList.slice(0, perPage)
          );
          setLoading(false);
          return false;
        }
    
        history.push(`/${query}`);
        var filterPokemons = pokemonsList.filter((item) => {
          return (
            item.name.includes(query.toLowerCase()) || item.number.includes(query)
          );
        });
    
        handleResult(filterPokemons.length, filterPokemons.slice(0, perPage));
        setLoading(false);
      }, [query]);
    const loadPokemons = async () => {
        let pokeList = await api.get(`pokemon/?limit=${limit}`)
        let pokemonsDetails = [];
        for(let i = 0; i < pokeList.data.results.length; i++){
            let pokeDetail = await api.get(`pokemon/${pokeList.data.results[i].name}`)
            let tempObj = {
                name: pokeDetail.data.name,
                id: pokeDetail.data.id,
                types: pokeDetail.data.types,
                number: pokeDetail.data.id.toString().padStart(3, "0"),
            }
            pokemonsDetails.push(tempObj)
        }
        savePokemons(pokemonsDetails)
        pokemonsList = pokemonsDetails
        handleResult(pokemonsDetails.length, pokemonsDetails)
        setLoading(false);
    }

    const handleResult = (maximum, pokemons) => {
        max = maximum;
        setPokemons(pokemons);
    }
    return(
        <div>
            <Header/>
            <Container fluid>
            <Search history={history} query={query} />
                {loading ? (<LoadingCard qty={12}/>) : (
                    <Row>
                        {pokemons.map((item) => {
                            return (
                            <Col key={item.id} xs={12} sm={6} lg={3}>
                                <PokeCard
                                name={item.name}
                                id={item.id}
                                types={item.types}
                                number = {item.number}
                                click={true}
                                />
                            </Col>
                            );
                        })}
                    </Row>
                )}
            </Container>
        </div>
    )
}

export default Home;
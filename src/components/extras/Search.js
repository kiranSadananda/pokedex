import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./styles.css"
const Search = ({history, query}) => {
    const [searchQuery, setSearchQuery] = useState(query || '')

    useEffect(() => {
        history.push(`/${searchQuery}`)
    }, [searchQuery])

    return(
        <div className="container-search mb-4">
            <Form.Label>Name or Poke-ID</Form.Label>
            <div className="container-input-btn">
                <input className="d-block" type="text" 
                 onChange={(e) => setSearchQuery(e.currentTarget.value)}
                 value={searchQuery}
                 placeholder="Ex. Pikachu or 025"
                />
            {searchQuery !== "" && (
                <button onClick={() => setSearchQuery("")} className="btn-clear">
                    <FontAwesomeIcon icon={faTimes} color={"black"} />
                </button>
        )}
            </div>
        </div>
    )
}

export default Search;
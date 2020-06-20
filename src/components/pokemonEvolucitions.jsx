import React from 'react';
import { Card, Badge, Row } from "react-bootstrap";

const PokemonEvolucitions = (props) => {
    debugger;
    const evolutions = props.evolutions;
    return (
        <React.Fragment className=" d-flex justify-content-center">
            <div><span>Linea evolutiva:</span><br />{
                
                evolutions.map(e =>
                            <Card.Img className="w-25 offset-2" alt={e.name} src={`${e.sprites.front_default}`} />

                )
            }</div>
            <div><br />{

                evolutions.map(e =>
                        <Badge className="col-6">{e.name}</Badge>
                )
            }</div>
        </React.Fragment>
    )
}

export default PokemonEvolucitions;

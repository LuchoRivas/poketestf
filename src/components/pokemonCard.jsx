import React from 'react';
import { Card, Button, Form } from "react-bootstrap";
import DetailModal from "./detailmodal";

const PokeCard = (props) => {
    const [isShiny, setShiny] = React.useState(false);
    const [modalShow, setModalShow] = React.useState(false);

    const toggleShiny = () => {
        setShiny(shiny => !shiny);
    }

    return(
        <React.Fragment>
            {
                props &&
                <Card style={{ width: '18rem' }} className={`pokemon-type-${props.pokemon.types[0].type.name}`}>
                    <Card.Img hidden={isShiny} variant="top" alt="pokemon_image" src={`${props.pokemon.sprites.front_default}`} />
                    <Card.Img hidden={!isShiny} variant="top" alt="pokemon_image" src={`${props.pokemon.sprites.front_shiny}`} />
                    <Form.Check onClick={toggleShiny} className="px-3" inline label="shiny" id={'shiny'} />
                    <Card.Body>
                        <Card.Title className="text-capitalize">{props.pokemon.name}</Card.Title>
                        <Card.Text>
                            {
                                props.pokemon.species[0].flavor_text
                            }
                        </Card.Text>
                        <Button onClick={() => setModalShow(true)} variant="dark">Ver mas</Button>
                    </Card.Body>
                </Card>
            }
                <DetailModal
                key={props.pokemon.id}
                pokemon_data={props.pokemon}
                show={modalShow}
                onHide={() => setModalShow(false)}
                />
        </React.Fragment>
    )
}

export default PokeCard;

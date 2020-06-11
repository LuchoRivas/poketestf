import React from 'react';
import { Card, Button, Form, Badge, Col } from "react-bootstrap";
import DetailModal from "./detailmodal";

const PokeCard = (props) => {
    const [isShiny, setShiny] = React.useState(false);
    const [modalShow, setModalShow] = React.useState(false);

    const toggleShiny = () => {
        setShiny(shiny => !shiny);
    }
    const color1 = props.pokemon.types[0].type.name;
    return (
        <React.Fragment>
            {
                props &&
                    <Col xs={3}>
                        <Card className={`pokemon-type-${color1}`}>
                            <Card.Img hidden={isShiny} xs={12} variant="top" alt="pokemon_image" src={`${props.pokemon.sprites.front_default}`} />
                            <Card.Img hidden={!isShiny} xs={12} variant="top" alt="pokemon_image" src={`${props.pokemon.sprites.front_shiny}`} />
                            <Form.Check onClick={toggleShiny} className="px-3" inline label="shiny" id={'shiny'} />
                            <Card.Body>
                                <Card.Title className="text-capitalize">{props.pokemon.name}</Card.Title>
                                <div>{
                                    props.pokemon.types.map((pokemonType, i) =>
                                        <h6 key={`badge2_${pokemonType.type.name}_${i}`} className="text-uppercase d-inline"><Badge className={`pokemon-type-${pokemonType.type.name}`} variant="dark">{pokemonType.type.name}</Badge>{' '}</h6>
                                    )
                                }</div>
                                <Button onClick={() => setModalShow(true)} variant="dark">Ver mas</Button>
                            </Card.Body>
                        </Card>
                    </Col>
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

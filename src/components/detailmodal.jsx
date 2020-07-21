import React from 'react';
import { Modal, Col, Row, Badge, Table } from "react-bootstrap";
import DescriptionCarousel from "./descriptionCarousel";

const DetailModal = (props) => {
    const { pokemon_data, onClickEvolution } = props;
      return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-dark text-white" closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="text-capitalize">
            {pokemon_data.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
            {
            pokemon_data.stats &&
              <div>
                  <Row>
                      <Col xs={3}>
                          <p>N° {pokemon_data.id}</p>
                          {
                            pokemon_data.types.map(pokemonType => 
                              <h5 key={`badge_${pokemonType.type.name}`} className="text-uppercase d-inline"><Badge className={`pokemon-type-${pokemonType.type.name}`} variant="dark">{pokemonType.type.name}</Badge>{' '}</h5>
                            )
                          }
                      </Col>
                  <Col xs={3}>
                    <span><b>Estadisticas:</b></span>
                            {
                              pokemon_data.stats.map(pokemonStat => 
                                <div key={`stat_${pokemonStat.stat.name}`}><span className="text-capitalize" key={`stat_${pokemonStat.stat.name}`}>{pokemonStat.stat.name}: {pokemonStat.base_stat}</span><br/></div>
                              )
                            }
                      </Col>
                  <Col xs={6}>
                    <span><b>Descripción de la Pokedex:</b></span>
                        {/* descripciones */}
                        <DescriptionCarousel
                          items={pokemon_data.species}
                          captionText={'flavor_text'}
                        ></DescriptionCarousel>
                      </Col>
                  </Row>
                <Row>
                  
                  <div className="d-flex col-12">
                        <Table responsive>
                          <thead>
                        <span className="text-white text-capitalize border-0"><b>Linea evolutiva:</b></span>
                          </thead>
                          <tbody>
                            <tr>
                            {
                              pokemon_data.evolutions && pokemon_data.evolutions.map((pokemonEvolution, i) =>
                                <td onClick={() => onClickEvolution(pokemonEvolution.name)} key={`${pokemonEvolution.id}_${i}`} className="border-0"><img src={`${pokemonEvolution.sprites.front_default}`} alt={`evolution_image_${pokemonEvolution.id}`} /></td>
                              )
                            }
                        </tr>
                        <tr>
                          {
                            pokemon_data.evolutions && pokemon_data.evolutions.map((pokemonEvolution, i) =>
                              <th key={`${pokemonEvolution.id}_${i}`} className="text-white text-capitalize border-0">{pokemonEvolution.name}</th>
                            )
                          }
                        </tr>
                          </tbody>
                        </Table>
                    </div>
                  </Row>
              </div>
            }
        </Modal.Body>
      </Modal>
    );
  }

  export default DetailModal;

import React from 'react';
import { Modal, Col, Row, Badge, Table } from "react-bootstrap";

const DetailModal = (props) => {
    const pokemon = props.pokemon_data;
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-dark text-white" closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="text-capitalize">
            {pokemon.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
            {
            pokemon.stats &&
              <div>
                  <Row>
                      <Col xs={3}>
                          <p>N° {pokemon.id}</p>
                          {
                            pokemon.types.map(pokemonType => 
                                    <h5 key={`${pokemonType.type.name}_badge`} className="text-uppercase d-inline"><Badge variant="dark">{pokemonType.type.name}</Badge></h5>
                            )
                          }
                      </Col>
                      <Col xs={3}>
                            {
                              pokemon.stats.map(pokemonStat => 
                                <div key={`stat_${pokemonStat.stat.name}`}><span className="text-capitalize" key={`stat_${pokemonStat.stat.name}`}>{pokemonStat.stat.name}: {pokemonStat.base_stat}</span><br/></div>
                              )
                            }
                      </Col>
                  </Row>
                  <Row>
                    <div className="d-flex">
                      {
                        pokemon.evolutions && pokemon.evolutions.map((pokemonEvolution, i) => 
                            <div key={`${pokemonEvolution.id}_${i}`}>
                              <Table>
                                <thead>
                                  <tr>
                                    <th key={`${pokemonEvolution.id}_${i}`} className="text-white text-capitalize border-0">{pokemonEvolution.name}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="border-0"><img src={`${pokemonEvolution.sprites.front_default}`} alt={`evolution_image_${pokemonEvolution.id}`} /></td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                          )
                      }
                    </div>
                  </Row>
              </div>
            }
        </Modal.Body>
      </Modal>
    );
  }

  export default DetailModal;

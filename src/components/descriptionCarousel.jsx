import React, { useState } from 'react';
import { Carousel } from "react-bootstrap";

const DescriptionCarousel = (props) => {

    const { items, captionText } = props;
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel id={'description_carousel'} activeIndex={index} onSelect={handleSelect}>
          {
            items.length > 0 && items.map(item => 
                <Carousel.Item>
                    <Carousel.Caption className="px-5">
                    <p>{item[`${captionText}`]}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                )
          }

      </Carousel>
    );
  }

export default DescriptionCarousel;

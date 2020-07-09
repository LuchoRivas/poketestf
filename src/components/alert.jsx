import React, { useState } from 'react';
import { Alert } from "react-bootstrap";

const SearchAlert = (props) => {
    const { errorMsg } = props
    const [show, setShow] = useState(true);
    return(
        <React.Fragment>
            {
                show &&
                    <Alert variant="warning" onClose={() => setShow(false)} dismissible>
                        {errorMsg}
                    </Alert>
            }
        </React.Fragment>
    )
}

export default SearchAlert;

import React from 'react';
import { Alert } from "react-bootstrap";

const SearchAlert = (props) => {
    const [show, setShow] = React.useState(true);
    return(
        <React.Fragment>
            {
                show &&
                    <Alert variant="warning" onClose={() => setShow(false)} dismissible>
                        {props.errorMsg}
                    </Alert>
            }
        </React.Fragment>
    )
}

export default SearchAlert;
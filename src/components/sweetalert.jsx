import React from 'react';
import SweetAlert from 'sweetalert2-react';

const Swal = (props) => {
    const { show, setShow, title, text, type, confirmButtonText } = props;

    return(
        <div>
            <SweetAlert
                show={show}
                title={title}
                text={text}
                type={type}
                confirmButtonText={confirmButtonText}
                confirmButtonColor={'#f27474'}
                onConfirm={() => setShow(false)}
            />
        </div>
    )
}

export default Swal;

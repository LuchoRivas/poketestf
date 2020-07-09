import React from 'react';
import SweetAlert from 'sweetalert2-react';

const Swal = (props) => {
    const { showSweetAlert, setShowSweetAlert, title, text, type, confirmButtonText } = props;

    return(
        <div>
            <SweetAlert
                show={showSweetAlert}
                title={title}
                text={text}
                type={type}
                confirmButtonText={confirmButtonText}
                confirmButtonColor={'#f27474'}
                onConfirm={() => setShowSweetAlert(false)}
            />
        </div>
    )
}

export default Swal;

import React from 'react';

import './Iphone.css'
import iphone_header from '../../resources/iphone_header_one.png';

const Iphone = () => {
    return (
        <section>
            <img src={iphone_header} alt='iphone_header' id='iphone_header' />
        </section>
    );
}

export default Iphone
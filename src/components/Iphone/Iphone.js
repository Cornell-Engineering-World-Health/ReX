import React from 'react';

import './Iphone.css'
import iphone_header from '../../resources/iphone_header_crop.png';

const Iphone = () => {
    return (
        <section>
            <div className="iphone-box">
            <img src={iphone_header} alt='iphone_header' id='iphone_header' />
            </div>
        </section>
    );
}

export default Iphone
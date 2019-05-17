import React from 'react';

import './Headline.css'
import bg from '../../resources/back_shape.png';
import apple from '../../resources/apple.png';

const Headline = () => {
    return (
        <section>
            <img src={bg} alt='Background Shape' id='bg'/>
            <div className="header-box">
                <p className="header-text">
                    <span>Managing your health has</span>
                    <br/>
                    <span>never been so easy</span>
                </p>
                <p className="body-text">
                    <span>ReX is the health tracker that gives</span>
                    <br/>
                    <span>you complete control over everything from</span>
                    <br/>
                    <span>tracking prescriptions to logging symptoms</span>
                </p>
            </div>
            <img src={apple} alt="Apple" id='apple' />
        </section>
    );
}

export default Headline
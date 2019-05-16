import React from 'react';

import './Headline.css'
import bg from '../../resources/background.png';

const Headline = () => {
    return (
        <section>
            <img src={bg} alt='Background Shape' id='bg'/>
            <h1 className="header-text">
            <span>Managing your health has</span>
            <br/>
            <span>never been so easy</span>
            </h1>
            <p>ReX is a health tracker that gives you</p>
            <p>complete control over everything from</p>
            <p>tracking medications to logging symptoms</p>
        </section>
    );
}

export default Headline
import React from 'react'
import {FiLogIn} from 'react-icons/fi'
import Logo from '../../components/Logo'
import {Link} from 'react-router-dom'

import './styles.css'

const index = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <Logo/>
                </header>
                <main>
                    <h1>Seu marketplace de coleta de resíduos.</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
                    <Link to="/create-point">
                        <span><FiLogIn/></span>
                        <strong>Cadastre um ponto de coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
        
    )
}

export default index

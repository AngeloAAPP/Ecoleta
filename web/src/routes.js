import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Home from './pages/Home'
import CreatePoint from './pages/CreatePoint'

const routes = () => {
    return (
        <BrowserRouter>
            <Route component = {Home} path = '/' exact />
            <Route component = {CreatePoint} path = '/create-point' exact />
        </BrowserRouter>
    )
}

export default routes

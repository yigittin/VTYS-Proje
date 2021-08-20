import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Home from "./routes/Home"
import GpuPage from "./routes/GpuPage"
import CpuPage from "./routes/CpuPage"
import MboardPage from './routes/MboardPage';
import PsuPage from './routes/PsuPage'
import RamPage from './routes/RamPage'
import CoolerPage from './routes/CoolerPage'
import MonPage from './routes/MonPage'
import KasaPage from './routes/KasaPage'
import StoragePage from './routes/StoragePage'

import { ComponentsContextProvider } from './context/ComponentsContext'
import './components/List.css'
const App = (props) => {
    return (
        <ComponentsContextProvider>
        <div className='container'>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/gpu" component={GpuPage}></Route>
                    <Route exact path="/cpu" component={CpuPage}></Route>
                    <Route exact path="/mboard" component={MboardPage}></Route>
                    <Route exact path="/psu" component={PsuPage}></Route>
                    <Route exact path="/ram" component={RamPage}></Route>
                    <Route exact path="/cooler" component={CoolerPage}></Route>
                    <Route exact path="/mon" component={MonPage}></Route>
                    <Route exact path="/kasa" component={KasaPage}></Route>
                    <Route exact path="/storage" component={StoragePage}></Route>
                </Switch>
            </Router>
        </div>
        </ComponentsContextProvider>
    )
}

export default App

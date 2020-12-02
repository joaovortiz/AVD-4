import React from 'react';
import { Switch, Route } from 'react-router-dom';



import Perfil from '../pages/Index'
import Cadastrar from '../pages/cadastrar';
import Alterar from '../pages/Alterar';


const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Perfil} />
        <Route path="/cadastrar" component={Cadastrar} />
        <Route path="/editar/:id" component={Alterar} />
    </Switch>
)

export default Routes;
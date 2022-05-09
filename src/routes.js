import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route component={Home} exact  path="/"/>
            <Route component={Details} exact path="/details/:name?" />
        </Switch>
    </BrowserRouter>
);

export default Routes;
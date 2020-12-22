import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import RolesList from '../../config/roles';
import NotFound from "../../components/NotFound/NotFound";

function PrivateRoutes() {

    const { role, setRole } = useContext(UserContext);
    const roleStatus = role || "GUEST";

    console.log(RolesList[roleStatus]);
    console.log(roleStatus);

    return (
        <>
            <Switch>
                {RolesList[roleStatus].map(({ path, page: PageComponent }) => <Route exact path={path}>
                    <PageComponent setRole={setRole} role={roleStatus} />
                </Route>)}
                <Route path="*" component={NotFound} />
            </Switch>
        </>
    )
}

export default PrivateRoutes

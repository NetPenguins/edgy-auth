import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import { IRoute } from "./config";


interface IProps {
    routes: IRoute[];
  }

const Router: React.FC<IProps> = ({routes}) => {
    const authenticated: boolean = true;
    return (
        <Routes>
            {routes && routes.map(
                (route: IRoute) => 
                
                <Route 
                    key={route.path}
                    path={route.path}
                    element={
                        route.private ? (route.component && <PrivateRoute><route.component /></PrivateRoute>) 
                        : route.component && <route.component />
                    }
                />
            )}
        </Routes>
    )
}

export default Router;
import { Home, SupervisedUserCircle } from "@mui/icons-material";
import { ComponentType, lazy, LazyExoticComponent } from "react";

export interface IRoute {
    path: string;
    exact: boolean;
    fallback: NonNullable<JSX.Element> | null;
    title?: string;
    component?: LazyExoticComponent<ComponentType<any>>;
    routes?: IRoute[];
    redirect?: string;
    private?: boolean;
    onclick?: Function;
    divider?: boolean;
    icon?: JSX.Element | any;
    unauthorizedRoute?: string;
}

export const Routes: IRoute[] = 
[
    {
        path: '/',
        title: 'Home',
        exact: true,
        redirect: '/home',
        component: lazy(() => import('../../pages/Home')),
        fallback: <div> Loading ... </div>,
        icon: <Home />,
        divider: false
    },
    {
        path: '/secured',
        title: 'User Profile',
        exact: true,
        component: lazy(() => import('../../pages/UserProfile')),
        fallback: <div> Loading ... </div>,
        private: true,
        unauthorizedRoute: '/',
        icon: <SupervisedUserCircle />,
        divider: true
    }
    
]
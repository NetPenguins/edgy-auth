import { Home, SupervisedUserCircle } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { KeycloakProfile } from "keycloak-js";
import React, { Component, useEffect, useState } from "react";
import { ComponentType, lazy, LazyExoticComponent } from "react";
import { Route } from "react-router-dom";
import { RouteContext } from "react-router/dist/lib/context";
import UserProfile from "../../pages/UserProfile";
import { keycloak } from "../AuthContextProvider";
import HomePage from "../../pages/Home";
export interface IRoute {
    path: string;
    exact: boolean;
    fallback: NonNullable<JSX.Element> | null;
    title?: string;
    // component?: LazyExoticComponent<ComponentType<any>>;
    component?: JSX.Element;
    routes?: IRoute[];
    redirect?: string;
    private?: boolean;
    onclick?: Function;
    divider?: boolean;
    icon?: JSX.Element | any;
    unauthorizedRoute?: string;
}
const profileImageURL = "https://avatars.githubusercontent.com/";


export const Routes = (profile?: KeycloakProfile): IRoute[] => {
    const [routes, setRoutes] = useState(Array<IRoute>);
    
    useEffect(() => {
        console.log(profile)
        setRoutes([
            {
                path: '/',
                title: 'Home',
                exact: true,
                redirect: '/home',
                // component: lazy(() => import('../../pages/Home')),
                component: <HomePage />,
                fallback: <div> Loading ... </div>,
                icon: <Home />,
                divider: false
            },
            {
                path: '/secured',
                title: 'User Profile',
                exact: true,
                component: <UserProfile />,
                // component: lazy(() => import('../../pages/UserProfile')),
                fallback: <div> Loading ... </div>,
                private: true,
                unauthorizedRoute: '/',
                icon: profile ? <Avatar alt={profile.username} src={profileImageURL + profile.username }></Avatar> : <SupervisedUserCircle /> ,
                divider: true
            }
        ])
        
    }, [profile])
    return (
        routes
    )
}
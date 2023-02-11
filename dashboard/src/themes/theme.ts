import { ThemeOptions } from "@mui/material/styles";
import { createContext, useContext } from "react";


export const themeOptions: ThemeOptions = {
    palette: {
      mode: 'dark',
      primary: {
        main: '#40c4ff',
      },
      secondary: {
        main: '#f50057',
      },
    },
    
    spacing: 8,
  };



export interface ThemeValues {
    isDark: boolean;
    navOpen: boolean;
}

const initialTheme: ThemeValues = {
    isDark: true,
    navOpen: false
};

enum ThemeActions { 
    toggleTheme = "TOGGLE_THEME",
    toggleNav = "TOGGLE_NAV"
}

export const ThemeContext = createContext<ThemeValues>(initialTheme);
const ThemeDispatchContext = createContext(ThemeContext);

function themeReducer(theme: ThemeValues, action: ThemeActions) {
    switch (action) {
        case ThemeActions.toggleTheme: {
        return {...theme, isDark: !theme.isDark};
        }
        case ThemeActions.toggleNav: {
        return {...theme, navOpen: !theme.navOpen};
        }
        default: {
        throw Error('Unknown action: ' + action);
        }
    }
}

export function useTheme() {
    return useContext(ThemeContext);
}

export function useThemeDispatch() {
    return useContext(ThemeDispatchContext);
}

// const ThemeProvider = (children: JSX.Element): JSX.Element => {
//     const [theme, dispatch] = useReducer(themeReducer, initialTheme);
//     return (
//         // <ThemesStore.Provider value={theme}>
//         // {children}
//         // </ThemesStore.Provider>
//         <ThemeContext.Provider value={theme}>
        
//         </ThemeContext.Provider>
//     )
// }

  
  
import React, { act, FC, useMemo } from "react";

export interface State {
    displaySidebar: boolean;
    displayCartSidebar: boolean;
    displayModal: boolean;
    modalData: any;
    modalView: string;
}

const initialState = {
    displaySidebar: false,
    displayCartSidebar: false,
    displayModal: false,
    modalView: 'LOGIN_VIEW',
    modalData: null,
};

type Action = 
    | {
        type : 'OPEN_SIDEBAR';
      }
    | {
        type: 'CLOSE_SIDEBAR';
      }

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
    switch (action.type) {
        case 'OPEN_SIDEBAR': {
            return {
                ...state,
                displaySidebar: true,
            };
        }
        case 'CLOSE_SIDEBAR': {
            return {
              ...state,
              displaySidebar: false,
            };
          }
    }
}

export const UIProvider: FC<{ children?: React.ReactNode}> = (props) => {
    const [state, dispatch] = React.useReducer(uiReducer, initialState);
    
    const openSidebar = () => dispatch({ type: 'OPEN_SIDEBAR' });
    const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' });
    const toggleSidebar = () =>
        state.displaySidebar
          ? dispatch({ type: 'CLOSE_SIDEBAR' })
          : dispatch({ type: 'OPEN_SIDEBAR' });

    const value = useMemo(
        () => ({
            ...state,
            openSidebar,
            closeSidebar,
            toggleSidebar,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }),[state]);

    return <UIContext.Provider value={value} {...props} />;
}

export const useUI = () => {
    const context = React.useContext(UIContext);
    if (context === undefined) {
      throw new Error(`useUI must be used within a UIProvider`);
    }
    return context;
};
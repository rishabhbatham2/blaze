import React, { createContext, useEffect, useReducer } from 'react';

const encryptionKey = 'your-secret-key';
export const MyContext = createContext();

const initialState = {
    user: null,
    isloggedIn: false, // This will depend on `user`
    coup: '',
    item: {},
    cart: [],
    myItem: '',
    mycode: '',
    finalAmt: 0,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload, isloggedIn: action.payload !== null }; // Update isloggedIn based on user
        case 'SET_ITEM':
            return { ...state, item: action.payload };
        case 'SET_CART':
            return { ...state, cart: action.payload };
        case 'SET_COUPON':
            return { ...state, coup: action.payload };
        case 'SET_FINAL':
            return { ...state, finalAmt: action.payload };
        case 'SET_MY_ITEM':
            return { ...state, myItem: action.payload };
        case 'SET_MY_CODE':
            return { ...state, mycode: action.payload };
        case 'INITIALIZE_STATE':
            return { ...state, ...action.payload, isloggedIn: action.payload.user !== null }; // Initialize isloggedIn based on user
        default:
            return state;
    }
};

export const MyContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const storedUser = JSON.parse(localStorage.getItem('user')) || null;

        dispatch({
            type: 'INITIALIZE_STATE',
            payload: {
                cart: storedCart,
                user: storedUser,
            },
        });
    }, []);

    const loginUser = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        dispatch({ type: 'SET_USER', payload: userData });
    };

    const logoutUser = () => {
        localStorage.removeItem('user');

        dispatch({ type: 'SET_USER', payload: null });
    };

    const setFinal = (final) => {
        localStorage.setItem('finalamt', JSON.stringify(final));
        dispatch({ type: 'SET_FINAL', payload: final });
    };

    // Function to update cart
    const setCart = (cartData) => {
        localStorage.setItem('cart', JSON.stringify(cartData));
        dispatch({ type: 'SET_CART', payload: cartData });
    };

    return (
        <MyContext.Provider
            value={{
                ...state,
                loginUser,
                logoutUser,
                setFinal,
                setCart,
                dispatch, // Expose dispatch if custom actions are needed
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

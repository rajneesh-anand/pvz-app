import React, { createContext, useContext, useEffect, useReducer } from "react";

export const initialState = {
  balancedCoins: null,
};

export const userContext = createContext(initialState);

const userReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BALANCED_COINS": {
      return {
        ...state,
        balancedCoins: action.payload,
      };
    }
    case "DELETE_BALANCED_COINS": {
      return {
        ...state,
        balancedCoins: null,
      };
    }
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(userReducer, initialState);

  const userCoinBalance = async (mobile) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/user/coinbalance/${mobile}`
    );
    const result = await res.json();
    console.log(result.balancedCoins);

    dispatch({ type: "ADD_BALANCED_COINS", payload: result.balancedCoins });
  };

  return (
    <userContext.Provider
      value={{
        ...state,
        userCoinBalance,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserInfo = () => {
  const context = React.useContext(userContext);
  if (context === undefined) {
    throw new Error(`useUserInfo must be used within a UserProvider`);
  }
  return context;
};

export const ManagedUserContext = ({ children }) => (
  <UserProvider>{children}</UserProvider>
);

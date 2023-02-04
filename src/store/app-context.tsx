import React from "react";

export type Data = {
  category: string;
  seatCount: number;
  restaurant: string;
  menuList: Menu[];
  cart?: Cart;
};

export type Cart = {
  id: number;
};

export type Menu = {
  id: number;
  name: string;
  restaurant: string;
  availableMeals: string[];
};

const defaultValue: Data = {
  category: "",
  seatCount: 1,
  restaurant: "",
  menuList: [],
  cart: undefined,
};

const AppContext = React.createContext(defaultValue);

export default AppContext;

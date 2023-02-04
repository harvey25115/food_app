import { Link } from "react-router-dom";
import AppContext, { Data } from "./store/app-context";

const initialState: Data = {
  category: "",
  seatCount: 1,
  restaurant: "",
  menuList: [],
  cart: undefined,
};

function App() {
  return (
    <AppContext.Provider value={initialState}>
      <div className="w-[450px] sm:w-[90%] bg-gray-100 p-10 rounded-xl flex flex-col">
        <div className="text-5xl font-bold mb-3">Welcome!</div>
        <div className="text-2xl font-bold">Please start your order.</div>
        <Link
          to="/category"
          className="rounded-xl bg-orange-600 w-full p-1 mt-20 text-white text-center font-bold"
        >
          Order
        </Link>
      </div>
    </AppContext.Provider>
  );
}

export default App;

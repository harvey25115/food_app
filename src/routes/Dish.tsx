import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext, { Menu } from "../store/app-context";
import useCheckData from "../utils/dataCheck";
import DishCard from "../components/Dishcard";

/**
 * display and select dishes
 * step 3
 */
export default function Dish() {
  const nav = useNavigate();
  const dataContext = useContext(AppContext);

  // data validation on mount
  useCheckData(dataContext);

  // filter available menu by restaurant
  const filteredMenuList = dataContext.menuList.filter((menu) => {
    return menu.restaurant === dataContext.restaurant;
  });

  // order state
  const [orders, setOrders] = useState(dataContext.cart);

  // creating thumbnail for menu
  const menu = filteredMenuList.map((_menu: Menu) => {
    let defaultValue = 0;
    if (dataContext.cart) {
      defaultValue = (dataContext.cart as any)[_menu.id] || 0;
    }
    return (
      <DishCard
        id={_menu.id}
        name={_menu.name}
        defaultValue={defaultValue}
        setOrders={setOrders}
        key={_menu.id}
        updateOrders={updateOrders}
        readOnly={false}
      />
    );
  });

  // save orders to data context
  function updateOrders(orders: { id: number }) {
    dataContext.cart = { ...orders };
  }

  return (
    <div className="w-[700px] sm:w-[90%] md:w-[90%] mb-3 bg-gray-100 p-10 rounded-xl flex flex-col">
      <button
        onClick={() => nav(-1)}
        className="rounded-xl bg-gray-600 w-min p-1 px-3 text-white font-bold mb-5"
      >
        Back
      </button>
      <div className="text-2xl font-bold mb-2">Select dish and servings:</div>
      {/* menu items section */}
      <section className="grid grid-cols-2 mb-5 gap-3 sm:grid-cols-1">
        {menu}
      </section>
      <button
        onClick={() => {
          let total = Object.values(orders || {}).reduce(
            (sum, count) => (sum += count),
            0
          );
          if (total >= dataContext.seatCount) {
            nav("/confirmation");
          } else {
            alert(`Minimum order required: ${dataContext.seatCount}`);
          }
        }}
        className="rounded-xl bg-orange-600 p-1 text-white font-bold"
      >
        Proceed
      </button>
    </div>
  );
}

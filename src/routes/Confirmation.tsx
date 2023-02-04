import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext, { Menu } from "../store/app-context";
import useCheckData from "../utils/dataCheck";
import DishCard from "../components/Dishcard";

/**
 * display confirmation of order
 * step 4
 */
export default function Confirmation() {
  const nav = useNavigate();
  const dataContext = useContext(AppContext);

  // data validation on mount
  useCheckData(dataContext);

  // get the details of the order in the menu
  const filteredMenuList = dataContext.menuList.filter(
    (menu) => (dataContext.cart as any)[menu.id]
  );

  // creating thumbnail for order
  const menu = filteredMenuList.map((_menu: Menu) => {
    let defaultValue = (dataContext.cart as any)[_menu.id];
    return (
      <DishCard
        name={_menu.name}
        defaultValue={defaultValue}
        key={_menu.id}
        readOnly
      />
    );
  });

  return (
    <div className="w-[700px] sm:w-[90%] md:w-[90%] mb-3 bg-gray-100 p-10 rounded-xl flex flex-col">
      <button
        onClick={() => nav(-1)}
        className="rounded-xl bg-gray-600 w-min p-1 px-3 text-white font-bold mb-5"
      >
        Back
      </button>
      <div className="text-2xl font-bold mb-2">Confirm your order:</div>
      {/* category section */}
      <section className="grid grid-cols-2 mb-5">
        Meal category:
        <span className="font-bold">{dataContext.category}</span>
      </section>
      {/* no of people section */}
      <section className="grid grid-cols-2 mb-5">
        No. of people:
        <span className="font-bold">{dataContext.seatCount}</span>
      </section>
      {/* restaurant section */}
      <section className="grid grid-cols-2 mb-5">
        Restaurant:
        <span className="font-bold">{dataContext.restaurant}</span>
      </section>
      {/* order items section */}
      <section className="grid grid-cols-2 mb-5">Dishes:</section>
      <section className="grid grid-cols-2 mb-5 gap-3 sm:grid-cols-1">
        {menu}
      </section>
      <button
        onClick={() => {
          alert("Thank you. Your order is being processed. Please wait.");
          let totalCount = 0;
          const cartListDetails = filteredMenuList.map((_menu: Menu) => {
            let defaultValue = (dataContext.cart as any)[_menu.id];
            totalCount += defaultValue;
            return { id: _menu.id, name: _menu.name, servings: defaultValue };
          });
          console.log("Order details", {
            date: new Date(),
            category: dataContext.category,
            seatCount: dataContext.seatCount,
            restaurant: dataContext.restaurant,
            cart: cartListDetails,
            totalOrder: totalCount,
          });
        }}
        className="rounded-xl bg-orange-600 p-1 text-white font-bold"
      >
        Confirm
      </button>
    </div>
  );
}

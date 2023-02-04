import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import data from "../data/dishes.json";
import AppContext from "../store/app-context";
import useCheckData from "../utils/dataCheck";

/**
 * displays and select restaurant
 * step 2
 */
export default function Restaurant() {
  const nav = useNavigate();
  const dataContext = useContext(AppContext);

  // data validation on mount
  useCheckData(dataContext);

  // get json
  const { dishes } = data;
  // filter by category
  let filteredList = dishes.filter((dish) =>
    dish.availableMeals.includes(dataContext.category.toLowerCase())
  );
  dataContext.menuList = [...filteredList];
  // remove duplicate restaurant
  filteredList = filteredList.filter((dish, idx) => {
    const dupeFlag = !filteredList
      .slice(idx + 1)
      .find((_dish) => _dish.restaurant === dish.restaurant);
    return dupeFlag;
  });
  let defaultValue = "";
  // create option list
  let optionList = [
    <option value="" key={0}>
      ---
    </option>,
  ];
  optionList = optionList.concat(
    filteredList.map((dish) => {
      if (dish.restaurant === dataContext.restaurant) {
        defaultValue = dish.restaurant;
      }
      return (
        <option value={dish.restaurant} key={dish.id}>
          {dish.restaurant}
        </option>
      );
    })
  );

  // set default restaurant value
  if (!defaultValue) {
    dataContext.restaurant = "";
  }

  return (
    <div className="w-[450px] sm:w-[90%] mb-3 bg-gray-100 p-10 rounded-xl flex flex-col">
      <button
        onClick={() => nav(-1)}
        className="rounded-xl bg-gray-600 w-min p-1 px-3 text-white font-bold mb-5"
      >
        Back
      </button>
      <div className="text-2xl font-bold mb-2">Select a restaurant:</div>
      <section className="flex flex-col mb-5">
        <select
          name="restaurant"
          className="rounded-lg p-1 my-2 hover:cursor-pointer"
          defaultValue={defaultValue}
          onChange={(event) => {
            dataContext.restaurant = event.currentTarget.value;
          }}
        >
          {optionList}
        </select>
      </section>
      <button
        onClick={() => {
          if (dataContext.restaurant) {
            dataContext.cart = undefined;
            nav("/dish");
          } else {
            alert("Please select a restaurant.");
          }
        }}
        className="rounded-xl bg-orange-600 p-1 text-white font-bold"
      >
        Proceed
      </button>
    </div>
  );
}

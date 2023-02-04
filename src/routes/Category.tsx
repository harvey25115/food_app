import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../store/app-context";

// fixed meals
const MEALS = ["Breakfast", "Lunch", "Dinner"];

/**
 * displays and select category
 * step 1
 */
export default function Category() {
  const nav = useNavigate();
  const dataContext = useContext(AppContext);

  return (
    <div className="w-[450px] sm:w-[90%] mb-3 bg-gray-100 p-10 rounded-xl flex flex-col">
      <div className="text-2xl font-bold mb-2">Select a meal:</div>
      {/* category section */}
      <section className="flex flex-col mb-5">
        {MEALS.map((meal, idx) => {
          return (
            <div className="flex flex-col" key={idx}>
              <input
                type="radio"
                name="meal"
                id={`meal-${meal}`}
                className="hidden peer"
                defaultChecked={dataContext.category === meal}
                onClick={() => {
                  dataContext.category = meal;
                }}
                required
              />
              <label
                htmlFor={`meal-${meal}`}
                className="rounded-lg my-1 text-center bg-white p-1 hover:cursor-pointer border-4 border-transparent peer-checked:border-4 peer-checked:border-orange-600"
              >
                {meal}
              </label>
            </div>
          );
        })}
      </section>
      {/* no. of people section */}
      <section className="flex flex-col mb-5">
        <div className="text-2xl font-bold mb-2">No. of people:</div>
        <input
          type="number"
          name="seatCount"
          min={1}
          max={10}
          defaultValue={dataContext.seatCount}
          className="rounded-lg p-1 my-2 text-center"
          onChange={(event) => {
            dataContext.seatCount = +event.currentTarget.value;
          }}
          required
        />
      </section>
      <button
        onClick={() => {
          if (dataContext.seatCount > 10) {
            alert("Maximum number of people: 10");
            return;
          }
          if (dataContext.seatCount && dataContext.category) {
            nav("/restaurant");
          } else {
            alert("Please select a meal.");
          }
        }}
        className="rounded-xl bg-orange-600 p-1 text-white font-bold"
      >
        Proceed
      </button>
    </div>
  );
}

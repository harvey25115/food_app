/**
 * display thumbnail for menu items
 * can be a read-only or editable
 */
export default function DishCard({
  id,
  name,
  defaultValue,
  readOnly,
  setOrders,
  updateOrders,
}: {
  id?: number;
  name: string;
  defaultValue?: number;
  readOnly: boolean;
  setOrders?: Function;
  updateOrders?: Function;
}) {
  const isEditable = !readOnly && setOrders && updateOrders && id;
  return (
    <div className="rounded-lg bg-white p-1 flex items-center w-full sm:flex-col md:flex-col">
      <img src="/images/sample-food-img.png" alt="Dish" />
      <div className="truncate">{name}</div>
      {isEditable ? (
        <div className="ml-auto mr-2 sm:ml-0 md:ml-0">
          <input
            type="number"
            name="orderCount"
            min={0}
            max={100}
            defaultValue={defaultValue}
            className="rounded-lg p-1 my-2 text-center border-2"
            onChange={(event) => {
              const value = +event.currentTarget.value;
              if (value || defaultValue !== value) {
                setOrders((old: any) => {
                  const newOrder = { ...old, [id]: +value };
                  updateOrders(newOrder);
                  return newOrder;
                });
              }
            }}
          />
        </div>
      ) : (
        <div className="ml-auto mr-2 sm:ml-0 md:ml-0">
          <div className="rounded-lg p-1 my-2 text-center border-2">
            x {defaultValue}
          </div>
        </div>
      )}
    </div>
  );
}

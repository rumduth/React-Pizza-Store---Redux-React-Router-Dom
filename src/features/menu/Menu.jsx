import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
function Menu() {
  const data = useLoaderData();
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {data.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export default Menu;

export async function loader() {
  let data = await getMenu();
  return data;
}

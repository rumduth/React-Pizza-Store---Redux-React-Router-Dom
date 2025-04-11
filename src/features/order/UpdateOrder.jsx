import React from "react";
import { useFetcher } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";

export default function UpdateOrder() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH">
      <button
        className="rounded-xl bg-red-400 px-4 py-1 uppercase hover:scale-105 hover:bg-red-600 hover:text-white"
        // onClick={handlePriority}
      >
        Make Priority?
      </button>
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  let id = params.id;
  let updatedObj = { priority: true };
  await updateOrder(id, updatedObj);
  return null;
}

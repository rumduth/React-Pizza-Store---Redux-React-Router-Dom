import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";
function NotFound() {
  const { data, message } = useRouteError();
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{data || message}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;

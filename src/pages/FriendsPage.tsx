import { Link } from "react-router-dom";

import useFriends, { Friend } from "../hooks/useFriends";

const FriendsPage = () => {
  const { data } = useFriends<Friend>();
  // const { data: me } = useMe<Customer>();

  return (
    <div>
      <h1 className="text-center">Amigos</h1>
      <ul className="list-group">
        {data?.results.map((friend, index) => (
          <li key={index} className="my-2">
            <Link
              className="btn btn-primary w-100"
              to={`/friends/${friend.id}`}
            >{`${index + 1} - ${friend.name}`}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsPage;

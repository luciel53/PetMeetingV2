import SearchMembers from "../components/SearchMembers";
import Grid from "../components/Grid";
import users from "../components/Users";
import cats from "../components/Cats";

export default function Members() {
  return (
    <div>
      <div className="mt-32">
        <SearchMembers />
      </div>
      <div>
        <Grid items={users} />
      </div>
    </div>
  );
}

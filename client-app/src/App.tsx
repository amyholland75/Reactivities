import { useEffect, useState } from "react";
import "./App.css";
import { ducks } from "./demo";
import DuckItem from "./duckitem";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

function App() {
  const [activities, setActivites] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((response) => {
      setActivites(response.data);
    });
  }, []);

  return (
    <div>
      <Header as="h2" icon="users" content="Activities"></Header>
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>

      <h1>Hello World</h1>
      {ducks.map((duck) => (
        <DuckItem key={duck.name} duck={duck} />
      ))}
    </div> //this is jsx code
  );
}

export default App;

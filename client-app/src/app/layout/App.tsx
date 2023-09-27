import { ducks } from "../../demo";
import DuckItem from "../../duckitem";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponents";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

function App() {
  const { activityStore } = useStore();
  // what is type inferences?

  // useEffect(() => {
  //   activityStore.loadActivities();
  // }, [activityStore]);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading app...." />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>

      <h1>Hello World</h1>
      {ducks.map((duck) => (
        <DuckItem key={duck.name} duck={duck} />
      ))}
    </> //this is jsx code
  );
}

export default observer(App);

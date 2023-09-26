import { useEffect, useState } from "react";
import { ducks } from "../../demo";
import DuckItem from "../../duckitem";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponents";

function App() {
  const [activities, setActivites] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setloading] = useState(true);
  const [submitting, setsubmitting] = useState(false);
  // what is type inferences?

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0]; //temp code to format date
        activities.push(activity);
      });
      setActivites(activities);
      setloading(false);
    });
  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setsubmitting(true);
    console.log("updated activity " + activity.id);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivites([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]); //remove the activity with the matching array and then add using the spread opeerator
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivites([...activities, activity]);
      });
    }
    setSelectedActivity(activity);
    setEditMode(false);
    setsubmitting(false);
  }

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function handleDeleteActivity(id: string) {
    setsubmitting(true);
    console.log("started Deleting");
    await sleep(2000).then(() => {
      console.log("slept!");
    });
    agent.Activities.delete(id).then(() => {
      setActivites([...activities.filter((x) => x.id !== id)]);
    });
    console.log("end Deleting");
    setsubmitting(false);
  }

  if (loading) return <LoadingComponent content="Loading app...." />;

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>

      <h1>Hello World</h1>
      {ducks.map((duck) => (
        <DuckItem key={duck.name} duck={duck} />
      ))}
    </> //this is jsx code
  );
}

export default App;

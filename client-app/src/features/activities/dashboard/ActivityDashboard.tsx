// semantic Grid is similar to bootstrap grid
//

//import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponents";

function ActivityDashboard() {
  const { activityStore } = useStore();
  const { loadActivities, activities } = activityStore;

  useEffect(() => {
    if (activities.size === 0) activityStore.loadActivities();
  }, [loadActivities]);

  if (activityStore.loading)
    return <LoadingComponent content="Loading app...." />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList></ActivityList>
      </Grid.Column>
      <GridColumn width="6">
        <h2>Activity filters</h2>
      </GridColumn>
    </Grid>
  );
}

export default observer(ActivityDashboard);

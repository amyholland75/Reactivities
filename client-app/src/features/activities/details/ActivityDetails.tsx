import { Button, Card, Icon, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

export default observer(function ActivityDetails() {
  const { activityStore } = useStore();
  const { selectedActivity: activity, loadActivity, loading } = activityStore; //this is desctrucrting

  const { id } = useParams();
  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);

  if (loading || !activity) return <LoadingComponent />; //this is just to remove typescripot errors

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          <div>{activity.description}</div>
          <div>Venue : {activity.venue}</div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            as={Link}
            to={`/manage/${activity.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            as={Link}
            to={`/activities`}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
        <a>
          <Icon name="building outline" />
          {activity.city}
        </a>
      </Card.Content>
    </Card>
  );
});

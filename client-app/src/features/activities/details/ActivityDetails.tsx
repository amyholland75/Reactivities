import { Button, Card, Icon, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity;
  openForm: (id: string) => void;
  cancelSelectActivity: () => void;
}

export default function ActivityDetails({
  activity,
  openForm,
  cancelSelectActivity,
}: Props) {
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
            onClick={() => openForm(activity.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectActivity}
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
}

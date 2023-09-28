import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  activities: Map<string, Activity> = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined; //union of types
  editMode: boolean = false;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this, {});
  }

  get activitiesByDate() {
    return Array.from(this.activities.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  loadActivities = async () => {
    this.setLoading(true);
    //async code must be in try catch block, sync code outside
    try {
      const localActivities = await agent.Activities.list();
      runInAction(() => {
        this.activities.clear();
        localActivities.forEach((activity) => {
          this.addActivityToMap(activity);
        });
        this.setLoading(false);
      });
    } catch (error) {
      runInAction(() => {
        console.log(error); //todo add error logging
        this.setLoading(false);
      });
    }
  };

  private getActivityFromMap = (id: string) => {
    return this.activities.get(id);
  };

  private addActivityToMap = (activity: Activity) => {
    activity.date = activity.date.split("T")[0]; //temp code to format date
    this.activities.set(activity.id, activity); //this is setting the state
  };

  loadActivity = async (id: string) => {
    let myActivity = this.getActivityFromMap(id);
    if (myActivity) {
      this.selectedActivity = myActivity;
    } else {
      this.setLoading(true);
      try {
        let myActivity = await agent.Activities.details(id);
        runInAction(() => {
          this.addActivityToMap(myActivity);
          this.selectedActivity = myActivity;
          this.setLoading(false);
          return myActivity;
        });
      } catch (error) {
        runInAction(() => {
          console.log(error); //todo add error logging
          this.setLoading(false);
        });
      }
    }
    return this.selectedActivity;
  };

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      //run in action needed because this is async - for Mobx
      runInAction(() => {
        this.activities.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error); //todo add error logging
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activities.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error); //todo add error logging
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activities.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error); //todo add error logging
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  //use arrow function heres are will auto bind
  //   setTitle = () => {
  //     this.title = this.title + "!";
  //   };
}

import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  activities: Map<string, Activity> = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined; //union of types
  editMode: boolean = false;
  loading: boolean = false;
  loadingInitial: boolean = true;
  submitting: boolean = false;

  constructor() {
    makeAutoObservable(this, {});
  }

  get activitiesByDate() {
    return Array.from(this.activities.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  loadActivities = async () => {
    //async code must be in try catch block, sync code outside
    try {
      const localActivities = await agent.Activities.list();
      runInAction(() => {
        this.activities.clear();
        localActivities.forEach((activity) => {
          activity.date = activity.date.split("T")[0]; //temp code to format date
          this.activities.set(activity.id, activity); //this is setting the state
          this.setLoadingInitial(false);
        });
      });
    } catch (error) {
      runInAction(() => {
        console.log(error); //todo add error logging
        this.setLoadingInitial(false);
      });
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  setSelectedActivity = (id: string) => {
    this.selectedActivity = this.activities.get(id);
  };

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  openForm = (id?: string) => {
    id ? this.setSelectedActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
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
        if (this.selectedActivity?.id === id) this.cancelSelectedActivity;
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

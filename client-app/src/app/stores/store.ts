import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
  activityStore: ActivityStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
};

export const StoreContext = createContext(store); //this is method in React that creates the context

export function useStore() {
  return useContext(StoreContext);
}

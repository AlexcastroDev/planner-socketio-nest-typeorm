import { DataSource } from "typeorm";
import { Planner } from "./planner.entity";

export const PlannerRepositoryName = "PLANNER_REPOSITORY";
export const plannerProviders = [
  {
    provide: PlannerRepositoryName,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Planner),
    inject: ["DATA_SOURCE"],
  },
];

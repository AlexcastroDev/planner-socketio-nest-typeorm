import { Module } from "@nestjs/common";
import { PlannerGateway } from "./planner.gateway";
import { DatabaseModule } from "src/Database/database.module";
import { PlannerService } from "./planner.service";
import { plannerProviders } from "./planner.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    ...plannerProviders,
    PlannerService,
    PlannerGateway,
  ],
})
export class PlannerModule {}

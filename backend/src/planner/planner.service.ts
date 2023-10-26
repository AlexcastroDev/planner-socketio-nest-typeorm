import { Inject, Injectable } from "@nestjs/common";
import { PlannerRepositoryName } from "./planner.providers";
import { Planner } from "./planner.entity";
import { Repository } from "typeorm";

@Injectable()
export class PlannerService {
  constructor(
    @Inject(PlannerRepositoryName) private plannerRepository: Repository<
      Planner
    >,
  ) {}

  async create(planner: Partial<Planner>): Promise<Partial<Planner>> {
    return await this.plannerRepository.save(planner);
  }

  async update(planner: Partial<Planner>, id: string) {
    return await this.plannerRepository.update(id, planner);
  }

  async findByUserId(userId: string) {
    return await this.plannerRepository.findBy({ userId });
  }
}

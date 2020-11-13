import { inject, injectable } from 'tsyringe';

import LookStyle from '@modules/looks/infra/typeorm/entities/LookStyle';
import ILookStylesRepository from '../repositories/ILookStylesRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description?: string;
}

@injectable()
class CreateLookStylesService {
  constructor(
    @inject('LookStylesRepository')
    private lookStylesRepository: ILookStylesRepository
  ) {}

  public async execute({ name, description }: IRequest): Promise<LookStyle> {
    const checkLookStylesExists = await this.lookStylesRepository.findLookStyleByName(
      name
    );

    if (checkLookStylesExists) {
      throw new AppError('Look style name already in use!', 403);
    }

    const lookStyle = await this.lookStylesRepository.create({
      name,
      description,
    });

    return lookStyle;
  }
}

export default CreateLookStylesService;

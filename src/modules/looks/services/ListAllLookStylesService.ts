import { inject, injectable } from 'tsyringe';

import LookStyle from '@modules/looks/infra/typeorm/entities/LookStyle';
import ILookStylesRepository from '../repositories/ILookStylesRepository';

@injectable()
class ListAllLookStylesService {
  constructor(
    @inject('LookStylesRepository')
    private lookStylesRepository: ILookStylesRepository
  ) {}

  public async execute(): Promise<LookStyle[] | undefined> {
    const lookStyles = await this.lookStylesRepository.findAllLookStyles();

    return lookStyles;
  }
}

export default ListAllLookStylesService;

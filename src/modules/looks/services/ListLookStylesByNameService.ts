import { inject, injectable } from 'tsyringe';

import LookStyle from '@modules/looks/infra/typeorm/entities/LookStyle';
import ILookStylesRepository from '../repositories/ILookStylesRepository';

interface IRequest {
  name: string;
}

@injectable()
class ListLookStylesByNameService {
  constructor(
    @inject('LookStylesRepository')
    private lookStylesRepository: ILookStylesRepository
  ) {}

  public async execute({ name }: IRequest): Promise<LookStyle | undefined> {
    const lookStyle = await this.lookStylesRepository.findLookStyleByName(name);

    return lookStyle;
  }
}

export default ListLookStylesByNameService;

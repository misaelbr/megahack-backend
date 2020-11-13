import { inject, injectable } from 'tsyringe';

import LookStyle from '@modules/looks/infra/typeorm/entities/LookStyle';
import ILookStylesRepository from '../repositories/ILookStylesRepository';

interface IRequest {
  look_styles_id: string;
}

@injectable()
class ListLookStylesByIdService {
  constructor(
    @inject('LookStylesRepository')
    private lookStylesRepository: ILookStylesRepository
  ) {}

  public async execute({
    look_styles_id,
  }: IRequest): Promise<LookStyle | undefined> {
    const lookStyle = await this.lookStylesRepository.findLookStyleById(
      look_styles_id
    );

    return lookStyle;
  }
}

export default ListLookStylesByIdService;

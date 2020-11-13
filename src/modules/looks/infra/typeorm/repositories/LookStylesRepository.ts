import { Repository, getRepository } from 'typeorm';
import CreateLookStyleDTO from '@modules/looks/dtos/CreateLookStyleDTO';
import ILookStylesRepository from '@modules/looks/repositories/ILookStylesRepository';
import LookStyle from '../entities/LookStyle';

class LookStylesRepository implements ILookStylesRepository {
  private ormRepository: Repository<LookStyle>;

  constructor() {
    this.ormRepository = getRepository(LookStyle);
  }

  public async create({
    name,
    description,
  }: CreateLookStyleDTO): Promise<LookStyle> {
    const lookStyle = this.ormRepository.create({ name, description });

    await this.ormRepository.save(lookStyle);

    return lookStyle;
  }

  public async save(lookStyle: LookStyle): Promise<LookStyle> {
    return await this.ormRepository.save(lookStyle);
  }

  public async findLookStyleById(
    look_style_id: string
  ): Promise<LookStyle | undefined> {
    const lookStyles = await this.ormRepository.findOne({
      where: {
        id: look_style_id,
      },
    });

    return lookStyles;
  }

  public async findLookStyleByName(
    name: string
  ): Promise<LookStyle | undefined> {
    const lookStyles = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return lookStyles;
  }

  public async findAllLookStyles(): Promise<LookStyle[] | undefined> {
    const lookStyles = await this.ormRepository.find();

    return lookStyles;
  }
}

export default LookStylesRepository;

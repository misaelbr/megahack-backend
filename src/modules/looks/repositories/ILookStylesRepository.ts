import CreateLookStyleDTO from '../dtos/CreateLookStyleDTO';
import LookStyle from '../infra/typeorm/entities/LookStyle';

export default interface ILookStyles {
  create({ name, description }: CreateLookStyleDTO): Promise<LookStyle>;
  save(lookStyle: LookStyle): Promise<LookStyle>;
  findLookStyleById(look_style_id: string): Promise<LookStyle | undefined>;
  findLookStyleByName(name: string): Promise<LookStyle | undefined>;
  findAllLookStyles(): Promise<LookStyle[] | undefined>;
}

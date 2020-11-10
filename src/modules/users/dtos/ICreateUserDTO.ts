export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'not informed';
}

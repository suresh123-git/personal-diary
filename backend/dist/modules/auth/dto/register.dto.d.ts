import { HouseType } from '../../../schemas/user.schema';
export declare class RegisterDto {
    name: string;
    email: string;
    password: string;
    house?: HouseType;
}

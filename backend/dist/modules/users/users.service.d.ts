import { Model } from 'mongoose';
import { UserDocument } from '../../schemas/user.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SelectHouseDto } from './dto/select-house.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findById(userId: string): Promise<UserDocument>;
    selectHouse(userId: string, selectHouseDto: SelectHouseDto): Promise<UserDocument>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<UserDocument>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    deleteAccount(userId: string): Promise<{
        message: string;
    }>;
}

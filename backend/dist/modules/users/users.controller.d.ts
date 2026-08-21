import { UsersService } from './users.service';
import { SelectHouseDto } from './dto/select-house.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(userId: string): Promise<import("../../schemas/user.schema").UserDocument>;
    selectHouse(userId: string, dto: SelectHouseDto): Promise<import("../../schemas/user.schema").UserDocument>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<import("../../schemas/user.schema").UserDocument>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    deleteAccount(userId: string): Promise<{
        message: string;
    }>;
}

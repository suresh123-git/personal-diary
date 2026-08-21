"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("./auth.service");
const user_schema_1 = require("../../schemas/user.schema");
const audit_log_schema_1 = require("../../schemas/audit-log.schema");
describe('AuthService', () => {
    let service;
    const mockUserModel = {
        findOne: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        create: jest.fn(),
    };
    const mockAuditLogModel = {
        create: jest.fn(),
    };
    const mockJwtService = {
        signAsync: jest.fn().mockResolvedValue('test_token'),
    };
    const mockConfigService = {
        get: jest.fn().mockReturnValue('secret'),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                auth_service_1.AuthService,
                { provide: (0, mongoose_1.getModelToken)(user_schema_1.User.name), useValue: mockUserModel },
                { provide: (0, mongoose_1.getModelToken)(audit_log_schema_1.AuditLog.name), useValue: mockAuditLogModel },
                { provide: jwt_1.JwtService, useValue: mockJwtService },
                { provide: config_1.ConfigService, useValue: mockConfigService },
            ],
        }).compile();
        service = module.get(auth_service_1.AuthService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=auth.service.spec.js.map
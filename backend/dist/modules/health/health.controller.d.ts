export declare class HealthController {
    checkHealth(): {
        status: string;
        timestamp: string;
        service: string;
    };
    checkReadiness(): {
        status: string;
        timestamp: string;
    };
    checkLiveness(): {
        status: string;
        timestamp: string;
    };
}

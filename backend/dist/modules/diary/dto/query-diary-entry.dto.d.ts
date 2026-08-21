export declare class QueryDiaryEntryDto {
    page?: number;
    limit?: number;
    search?: string;
    tag?: string;
    mood?: string;
    date?: string;
    startDate?: string;
    endDate?: string;
    isFavorite?: boolean;
    isPrivate?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

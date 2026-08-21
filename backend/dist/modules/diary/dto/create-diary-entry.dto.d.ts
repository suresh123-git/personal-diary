export declare class CreateDiaryEntryDto {
    title: string;
    content?: string;
    plainTextContent?: string;
    date: string;
    mood?: string;
    tags?: string[];
    location?: string;
    weather?: string;
    photos?: string[];
    voiceNote?: string;
    isFavorite?: boolean;
    isPrivate?: boolean;
}

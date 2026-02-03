// Centralized types for iplaymusic app
// Add new types here and import/export as needed

// Track and related types
export interface ArtistType {
    id: string; // Remove '| undefined'
    name: string;
};

export type AlbumImageType = {
    url: string;
};

export type AlbumType = {
    images?: AlbumImageType[];
};

export type TrackType = {
    id: string;
    name: string;
    artists: ArtistType[];
    duration_ms: number; // Remove '| undefined'
    album?: AlbumType;
    // Add other properties as needed
};

export type TrackProps = {
    track: TrackType;
    isPlaying: boolean;
    onPlayPause: () => void;
    children?: React.ReactNode;
};

export type FavoriteTrackProps = {
    playingId: string | null;
    handlePlayPause: (trackId: string) => void;
};

export type PendingRemoval = {
    [trackId: string]: number; // countdown in seconds
};

// Theme types
export type ThemeMode = "light" | "dark" | "custom_1" | "custom_2" | "custom_3";

export type ThemeModeContextType = {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
};

// Category types
export type CategoryType = {
    id: string | number;
    name: string;
    icon?: string;
    subcategories?: SubcategoryType[];
};

export type SubcategoryType = {
    name: string;
    image: string;
};

// Context types
export type CategoryStateContextType = {
    openIndex: string | number | null;
    setOpenIndex: (idx: string | number | null) => void;
};

// Props for layout
export type LayoutProps = {
    children: React.ReactNode;
};

/** @format */

export interface IMusic {
  annotation_count: number;
  api_path: string;
  artist_names: string;
  featured_artists: [];
  full_title: string;
  header_image_thumbnail_url: "https://assets.genius.com/images/default_cover_image.png?1674765071";
  header_image_url: "https://assets.genius.com/images/default_cover_image.png?1674765071";
  id: number;
  language: string;
  lyrics_owner_id: number;
  lyrics_state: string;
  path: string;
  primary_artist: { api_path: string };
  pyongs_count: number | null;
  relationships_index_url: string;
  release_date_components: { year: number; month: number; day: number };
  release_date_for_display: string;
  release_date_with_abbreviated_month_for_display: string;
  song_art_image_thumbnail_url: "https://assets.genius.com/images/default_cover_image.png?1674765071";
  song_art_image_url: "https://assets.genius.com/images/default_cover_image.png?1674765071";
  stats: { unreviewed_annotations: number; hot: boolean };
  title: string;
  title_with_featured: string;
  url: string;
}

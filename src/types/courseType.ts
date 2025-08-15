interface CourseType {
  id: string;
  title: string;
  cover: string;
  description: string;
  price: number;
  type: number;
  totalModules: number;
  totalModulesDone: number;
  createdAt: string;
  updatedAt: string;
}

interface VideoType {
  id: string;
  description: string;
  title: string;
  url: string;
  url_vimeo: string;
  thumbnailUrl: string;
  wasWatched: boolean;
  createdAt: string; // Assuming this is a date-time string
  updatedAt: string; // Assuming this is a date-time string
}

interface ModuleType {
  id: string;
  title: string;
  cover: string;
  description: string;
  knowledgeArea: string;
  totalVideos: number;
  totalVideosWatched: number;
  createdAt: string; // Assuming this is a date-time string
  updatedAt: string; // Assuming this is a date-time string
}
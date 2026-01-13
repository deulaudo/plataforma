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
  videoId: string;
  description: string;
  title: string;
  url: string;
  url_vimeo: string;
  thumbnailUrl: string;
  wasWatched: boolean;
  createdAt: string; // Assuming this is a date-time string
  updatedAt: string; // Assuming this is a date-time string
  rating: number | null;
}

interface ModuleType {
  id: string;
  title: string;
  cover: string | null;
  description: string;
  knowledgeArea: string;
  totalVideos: number;
  totalWatched: number;
  createdAt: string; // Assuming this is a date-time string
  updatedAt: string; // Assuming this is a date-time string
}

interface ComentarioType {
  id: string;
  content: string;
  referenceType: "QUESTION" | "VIDEO";
  referenceId: string;
  parentId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  parent: ComentarioType | null;
}

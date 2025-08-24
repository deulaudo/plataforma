import api from "./api";

type ListCoursesResponse = CourseType[];
type ListModulesResponse = ModuleType[];
type ListVideosResponse = VideoType[];

async function listCourses(): Promise<ListCoursesResponse> {
  const response = await api.get<ListCoursesResponse>("web-platform/courses");
  return response.data;
}

async function getModule(moduleId: string): Promise<ModuleType> {
  const response = await api.get<ModuleType>(`web-platform/modules/${moduleId}`);
  return response.data;
}

async function listModules(courseId?: string): Promise<ListModulesResponse> {
  const response = await api.get<ListModulesResponse>("web-platform/modules", {
    params: {
      course_id: courseId,
    }
  });
  return response.data;
}

async function listVideos(moduleId?: string): Promise<ListVideosResponse> {
  const response = await api.get<ListVideosResponse>("web-platform/videos", {
    params: {
      moduleId: moduleId,
    }
  });
  return response.data;
}

async function getVideo(videoId: string): Promise<VideoType> {
  const response = await api.get<VideoType>(`web-platform/videos/${videoId}`);
  return response.data;
}

async function updateVideo(videoId: string): Promise<VideoType> {
  const response = await api.post<VideoType>(`web-platform/videos/${videoId}/watched`, {});
  return response.data;
}

export const coursesService = {
  listCourses,
  getModule,
  listModules,
  getVideo,
  listVideos,
  updateVideo,
};



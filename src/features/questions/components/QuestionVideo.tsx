import { ExamSubcategoryQuestion } from "@/types/examType";

type QuestionVideoProps = {
  question: ExamSubcategoryQuestion;
};

const QuestionVideo = ({ question }: QuestionVideoProps) => {
  return (
    <div className="flex flex-col gap-[24px] w-full max-w-[765px] dark:bg-[#1a2440] bg-[#e1e2e3] border dark:border-[#FFFFFF0D] border-[#E9EAEC] rounded-[36px] p-[24px]">
      <span className="text-[16px] dark:text-white text-black">
        Comentário em vídeo
      </span>

      <video
        className="w-full h-[399px] rounded-[36px] object-cover"
        controls
        src={question.learnMoreVideoUrl}
        poster={question.thumbnailVideoUrl}
      ></video>
    </div>
  );
};

export default QuestionVideo;

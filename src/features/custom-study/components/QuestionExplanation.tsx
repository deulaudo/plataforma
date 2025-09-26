import ImageViewer from "@/components/ImageViewer";
import { CustomStudyQuestion } from "@/types/customStudyType";

type QuestionExplanationProps = {
  question: CustomStudyQuestion;
};

const QuestionExplanation = ({ question }: QuestionExplanationProps) => {
  return (
    <div className="flex flex-col gap-[24px] w-full max-w-[765px] dark:bg-[#1a2440] bg-[#e1e2e3] border dark:border-[#FFFFFF0D] border-[#E9EAEC] rounded-[36px] p-[24px]">
      <span className="text-[16px] dark:text-white text-black">
        Explicação:
      </span>

      {question.learnMoreImageUrl && (
        <div className="flex justify-center">
          <ImageViewer
            imageUrl={question.learnMoreImageUrl}
            altText="Explicação da questão"
          />
        </div>
      )}

      <p
        className="dark:text-white text-black font-semibold text-[16px]"
        dangerouslySetInnerHTML={{
          __html: (question.learnMore || "")
            .replace(/\n/g, "<br />")
            .replace(/\\n/g, "<br />"),
        }}
      />
    </div>
  );
};

export default QuestionExplanation;

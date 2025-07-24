import { ExamSubcategory } from "@/types/examType";

type StudyModeSubcategoryQuestionsProps = {
  subcategory: ExamSubcategory;
};

const StudyModeSubcategoryQuestions = ({
  subcategory,
}: StudyModeSubcategoryQuestionsProps) => {
  return (
    <div>
      <h2>{subcategory.name}</h2>
    </div>
  );
};

export default StudyModeSubcategoryQuestions;

import QuestionModel from "@/model/QuestionModel";
import styles from "../styles/Question.module.css";
import Alternative from "./Alternative";
import StatementQuestion from "./StatementQuestion";
import Timer from "./Timer";

const letters = [
  { value: "A", color: "#F2C866" },
  { value: "B", color: "#F266BA" },
  { value: "C", color: "#85D4F2" },
  { value: "D", color: "#BCE596" }
]

interface QuestionProps {
  question: QuestionModel,
  timeToAnswer?: number,
  chosenAlternative: (index: number) => void
  timeOut: () => void
}

export default function Question(props: QuestionProps) {
  const { question, timeToAnswer } = props;

  function renderAlternatives() {
    return question.alternatives.map((alternative, i) => (
      <Alternative
        key={`${question.id}-${i}`}
        alternative={alternative}
        index={i} letter={letters[i].value}
        letterBackGroundColor={letters[i].color}
        chosenAlternative={props.chosenAlternative}
      />
    ))
  }

  return (
    <div className={styles.question}>
      <StatementQuestion text={question.statementQuestion} />
      <Timer duration={timeToAnswer ?? 30} timeOut={props.timeOut} key={question.id} />
      {renderAlternatives()}
    </div>
  )
}
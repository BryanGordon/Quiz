import { Button } from "@mui/material"
import { useQuestionsData } from "./Hooks/useQuestionsData"
import { useQuestionState } from "./store/questions"

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestionState(state => state.reset)
  
  return (
    <footer style={{ marginTop: '16px'}}>
      <strong style={{fontWeight: 'bold', color: 'green', paddingRight: '10px'}}>{`Correctas ${correct}`}</strong>
      <strong style={{fontWeight: 'bold', color: 'red', paddingRight: '10px'}}>{`Falladas ${incorrect}`}</strong>
      <strong style={{fontWeight: 'bold', color: 'yellow'}}>{`Sin contestar ${unanswered}`}</strong>
      <div style={{ marginTop: '16px'}}>
        <Button onClick={() => reset()}>
          Resetear preguntas
        </Button>
      </div>
    </footer>
  )
}
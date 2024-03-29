import { Button } from '@mui/material'
import { useQuestionState } from './store/questions'

const LIMIT_QUESTIONS = 10

export const Start = () => {
  const fetchQuestions = useQuestionState(state => state.fetchQuestions)
  
  const handleclick = () => {
    fetchQuestions(LIMIT_QUESTIONS)
  }
  return (
    <Button onClick={handleclick} variant='contained'>
      Empezar!!
    </Button>
  )
}
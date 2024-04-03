import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'

import SyntaxHighlighter from 'react-syntax-highlighter'
import {gradientDark} from 'react-syntax-highlighter/dist/esm/styles/hljs'

import { useQuestionState } from "./store/questions"
import { type Question as QuestionType } from "./types"
import { Footer } from "./Footer"

const getBackgroundColor = (info : QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info

  if (userSelectedAnswer == null) return 'transparent'

  if (index !== userSelectedAnswer && index !== correctAnswer ) return 'transparent'

  if (index === correctAnswer) return 'green'

  if (index === userSelectedAnswer) return 'red'
  
  return 'transparent'
}

const Question = ({info}: { info: QuestionType }) => {
  const selectAnswer = useQuestionState(state => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant="outlined" sx={{ bgcolor: '#222', p: 2, textAlign: 'left', marginTop: '4' }} >
      <Typography variant="h5" >
        {info.question}
      </Typography>
      <SyntaxHighlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: '#333' }} disablePadding >
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{
                backgroundColor: getBackgroundColor(info, index)
              }}
              
            >

              <ListItemText primary={answer} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionState(state => state.questions)
  const currentQuestion = useQuestionState(state => state.currentQuestion)
  const goNextQuestion = useQuestionState(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionState(state => state.goPreviousQuestion)

  const questionInfo = questions[currentQuestion]
  
  return (
    <>
    <Stack direction={"row"} gap={2} alignItems={"center"} justifyContent={"center"}>
      <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
        <ArrowBackIosNew />
      </IconButton>
      {currentQuestion + 1} / {questions.length}
      <IconButton onClick={goNextQuestion} disabled={currentQuestion > questions.length - 1}>
        <ArrowForwardIos />
      </IconButton>
    </Stack>
    <Question info={questionInfo} />
    <Footer />
    </>
  )
}
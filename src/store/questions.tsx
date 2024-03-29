import { create } from 'zustand'
import { type Question } from '../types'
import { persist } from 'zustand/middleware'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void,
  goNextQuestion: () => void,
  goPreviousQuestion: () => void,
  reset: () => void
}

export const useQuestionState = create<State>()(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit: number) => {
      const res = await fetch('http://localhost:5173/data.json')
      const json = await res.json()

      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions })

    },
    // Se realiza para volver a la colocar la informacion correcta, ya
   //  que se randomizo anteriormente. 
   //           (NO ES PARA OBTENER LA RESPUESTA CORRECTA) 
    selectAnswer: (questionId: number, answerIndex: number) => {
      // Se usa structure clone
      const { questions } = get()
      const newQuestions = structuredClone(questions)
      // Encontramos el indice de la pregunta
      const questionIndex = newQuestions.findIndex(q => q.id === questionId)
      // Obtener la informacion de la pregunta
      const questionInfo = newQuestions[questionIndex]
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

      // Se cambia la informacion en la pregunta copiada
      newQuestions[questionIndex] = {
        ... questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
       }

       set({ questions: newQuestions })

    },

    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1

      if (nextQuestion < questions.length) {
        set({currentQuestion: nextQuestion})
      }
    },

    goPreviousQuestion: () => {
      const { currentQuestion } = get()
      const previousQuestion = currentQuestion -1

      if (previousQuestion >= 0){
        set({ currentQuestion: previousQuestion })
      }
    },

    reset: () => {
      set({currentQuestion: 0, questions: []})
    }
  }
}, {
  name: 'questions'
}))

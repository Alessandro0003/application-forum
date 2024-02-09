import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { Question } from '@/domain/forum/enterprise/entities/question'

const fakeQuestionsRepository: QuestionRepository = {
  create: async (question: Question) => {
  }
}
test('create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await createQuestion.execute({
    authorId: '1',
    title: 'Title-example',
    content: 'Content-example'
  })

  expect(question.id).toBeTruthy()
})

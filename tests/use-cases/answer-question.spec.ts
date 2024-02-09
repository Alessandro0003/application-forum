import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })
  it('should be able create a answer', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova resposta'
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'
import { makeAnswer } from 'tests/factories/make-answer'
import { makeQuestion } from 'tests/factories/make-question'
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'
import { InMemoryQuestionRepository } from 'tests/repositories/in-memory-questions-repository'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer ', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new ChooseQuestionBestAnswerUseCase(inMemoryQuestionRepository, inMemoryAnswersRepository)
  })

  it('should be able to choose the question best answer ', async () => {
    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryQuestionRepository.create(question)

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString()
    })
    expect(answer.id).toBeTruthy()
    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose another use question best answer', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    })

    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryQuestionRepository.create(question)

    await inMemoryAnswersRepository.create(answer)

    expect(async () => {
      return await sut.execute({
        answerId: answer.id.toString(),
        authorId: 'author-2'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'
import { makeQuestion } from 'tests/factories/make-question'
import { InMemoryQuestionRepository } from 'tests/repositories/in-memory-questions-repository'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1'
    })
    expect(inMemoryQuestionRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)

    expect(async () => {
      return await sut.execute({
        authorId: 'author-2',
        questionId: 'question-1'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})

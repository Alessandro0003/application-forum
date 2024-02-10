import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'
import { InMemoryAnswersCommentsRepository } from '../repositories/in-memory-answers-comments-repository'
import { makeAnswerComment } from 'tests/factories/make-answer-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersCommentsRepository: InMemoryAnswersCommentsRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository()

    sut = new DeleteAnswerUseCase(inMemoryAnswersCommentsRepository)
  })

  it('should be able to delete answer comment ', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswersCommentsRepository.create(answerComment)

    await sut.execute({
      authorId: answerComment.authorId.toString(),
      answerId: answerComment.id.toString()
    })

    expect(inMemoryAnswersCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user answer comment', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID('author-1')
    })

    await inMemoryAnswersCommentsRepository.create(answerComment)

    expect(async () => {
      return await sut.execute({
        authorId: answerComment.authorId.toString(),
        answerId: 'author-2'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})

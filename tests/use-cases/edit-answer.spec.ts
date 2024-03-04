import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error'
import { makeAnswer } from 'tests/factories/make-answer'
import { makeAnswerAttachment } from 'tests/factories/make-answer-attachments'
import { InMemoryAnswerAttachmentsRepository } from 'tests/repositories/in-memory-answers-attachments.repository'
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
    sut = new EditAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerAttachmentsRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('1')
      }),

      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('2')
      })
    )

    await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: 'author-1',
      content: 'Conteudo teste',
      attachmentsIds: ['1', '3']

    })
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Conteudo teste'
    })

    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') })
    ])
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: 'author-2',
      content: 'Conteudo teste',
      attachmentsIds: []
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})

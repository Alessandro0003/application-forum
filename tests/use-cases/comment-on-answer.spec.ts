import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'
import { InMemoryAnswersCommentsRepository } from '../repositories/in-memory-answers-comments-repository'
import { InMemoryAnswersRepository } from '../repositories/in-memory-answers-repository'
import { makeAnswer } from 'tests/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswersCommentRepository: InMemoryAnswersCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswersCommentRepository = new InMemoryAnswersCommentsRepository()
    sut = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswersCommentRepository)
  })

  it('should be able comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: 'Comment Text'
    })

    expect(inMemoryAnswersCommentRepository.items[0].content).toEqual('Comment Text')
  })
})

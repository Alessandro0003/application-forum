import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'
import { makeQuestion } from 'tests/factories/make-question'
import { InMemoryQuestionCommentsRepository } from 'tests/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionRepository } from 'tests/repositories/in-memory-questions-repository'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment On Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()

    sut = new CommentOnQuestionUseCase(inMemoryQuestionRepository, inMemoryQuestionCommentsRepository)
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comment text'
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual('Comment text')
  })
})

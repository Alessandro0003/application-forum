import { right, left, Either } from '@/core/either'
import { AnswersCommentsRepository } from '../repositories/answers-comments-repository'

interface DeleteCommentAnswerUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteCommentAnswerUseCaseResponse = Either<string, {}>

export class DeleteCommentAnswerUseCase {
  constructor (
    private readonly answerCommentsRepository: AnswersCommentsRepository
  ) {}

  async execute ({ authorId, answerCommentId }: DeleteCommentAnswerUseCaseRequest): Promise<DeleteCommentAnswerUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      return left('Answer comment not found')
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left('not allowed')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}

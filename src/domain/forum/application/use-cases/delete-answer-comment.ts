import { AnswersCommentsRepository } from '../repositories/answers-comments-repository'

interface DeleteCommentAnswerUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteCommentAnswerUseCaseResponse {}

export class DeleteCommentAnswerUseCase {
  constructor (
    private readonly answerCommentsRepository: AnswersCommentsRepository
  ) {}

  async execute ({ authorId, answerCommentId }: DeleteCommentAnswerUseCaseRequest): Promise<DeleteCommentAnswerUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Answer comment not found')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('not allowed')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return {}
  }
}

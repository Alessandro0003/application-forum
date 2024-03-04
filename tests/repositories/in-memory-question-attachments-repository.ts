import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachment-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentsRepository {
  public items: QuestionAttachment[] = []

  async findManyByQuestionId (questionId: string) {
    const QuestionAttachments = this.items
      .filter((item) => item.questionId.toString() === questionId)

    return QuestionAttachments
  }
}

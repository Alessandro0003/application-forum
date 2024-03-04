import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'
import { Either, right } from '@/core/either'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type CreateQuestionUseCaseResponse = Either <null, { question: Question }>

export class CreateQuestionUseCase {
  constructor (
    private readonly questionRepository: QuestionRepository
  ) {}

  async execute ({ authorId, title, content, attachmentsIds }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content
    })

    const questionAttachments = attachmentsIds.map(attachmentsId => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentsId),
        questionId: question.id
      })
    })

    question.attachments = questionAttachments

    await this.questionRepository.create(question)

    return right({
      question
    })
  }
}

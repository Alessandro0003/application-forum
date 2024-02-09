import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { makeQuestion } from 'tests/factories/make-question'
import { InMemoryQuestionRepository } from 'tests/repositories/in-memory-questions-repository'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('slug-example-question')
    })

    inMemoryQuestionRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'slug-example-question'
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})

import { FetchRecentTopicsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-topics'
import { makeQuestion } from 'tests/factories/make-question'
import { InMemoryQuestionRepository } from 'tests/repositories/in-memory-questions-repository'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: FetchRecentTopicsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new FetchRecentTopicsUseCase(inMemoryQuestionRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2024, 1, 12) })
    )

    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2024, 1, 10) })
    )

    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2024, 1, 14) })
    )

    const { question } = await sut.execute({
      page: 1
    })

    expect(question).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 1, 14) }),
      expect.objectContaining({ createdAt: new Date(2024, 1, 12) }),
      expect.objectContaining({ createdAt: new Date(2024, 1, 10) })
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion())
    }

    const { question } = await sut.execute({
      page: 2
    })

    expect(question).toHaveLength(2)
  })
})
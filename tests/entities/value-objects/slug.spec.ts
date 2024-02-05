import { expect, test } from 'vitest'
import { Slug } from '../../../src/domain/entities/value-objects/slug'

test('it should be able to create slug from text', () => {
    const slug = Slug.createFromText('Example question title')

    expect(slug.value).toEqual('example-question-title')
})
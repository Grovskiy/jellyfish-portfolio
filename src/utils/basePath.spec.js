import { describe, it, expect } from 'vitest'
import { basePath } from '@/utils/basePath'
import { repositoryPath } from '@/data/repositoryPath'

describe('basePath', () => {
  it('returns correct path for production mode', () => {
    expect(basePath('production')).toBe(repositoryPath)
  })

  it('returns correct path for development mode', () => {
    expect(basePath('development')).toBe('/')
  })
})

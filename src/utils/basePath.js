import { repositoryPath } from '@/data/repositoryPath'

export const basePath = (mode) => (mode === 'production' ? repositoryPath : '/')

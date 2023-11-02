import nodeCache from './nodeCache'

interface CacheOptions {
  secondsUntilDestroyed?: number
}

const setCache = <T>(
  key: string,
  value: T,
  { secondsUntilDestroyed = 1800 }: CacheOptions = {}
) => {
  nodeCache.set(key, value, secondsUntilDestroyed)
}

const getCache = <T>(key: string): T => {
  return nodeCache.get(key)
}

const cache = {
  set: setCache,
  get: getCache,
}

export default cache

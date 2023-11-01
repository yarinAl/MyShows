const createDOMPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const DOMPurify = createDOMPurify(new JSDOM('').window)

export function sanitize(text: string): string {
  return DOMPurify.sanitize(text)
}

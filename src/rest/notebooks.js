import { get } from '.'

export function fetch(fileId) {
  return get(`notebooks/${fileId}/html`)
  .then(response => response.data )
}

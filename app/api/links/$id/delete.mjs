// View documentation at: https://enhance.dev/docs/learn/starter-project/api
import { deleteLink } from '../../../models/links.mjs'


/**
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function post (req) {
  const id = req.pathParameters?.id

  const session = req.session
  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, link: removed, ...newSession } = session
  try {
    let link = await deleteLink(id)
    return {
      session: newSession,
      json: { link },
      location: '/links'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/links'
    }
  }
}

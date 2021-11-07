import arg from 'arg'
import {createStoryBlocks} from './main'

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {},
    {
      argv: rawArgs.slice(2),
    }
  )

  return {
    dirName: args._[0],
  }
}

async function promptForMissingOptions(options) {
  const dirName = options.dirName || 'storyblocks'

  return {
    ...options,
    dirName: dirName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(),
  }
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args)
  options = await promptForMissingOptions(options)
  await createStoryBlocks(options)
}

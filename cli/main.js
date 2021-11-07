import fs from 'fs-extra'
import path from 'path'
import { promisify } from 'util'
import execa from 'execa'
import Listr from 'listr'
import { error, indent, info, log, success } from 'cli-msg'
import {projectInstall} from 'pkg-install'

const access = promisify(fs.access)

async function createDirectory(options) {
  const dir = options.applicationDirectory

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive: true,
    });

    if (!fs.existsSync(dir + '/src')) {
      fs.mkdirSync(dir + '/src', {
        recursive: true,
      })

      return true
    }

    return false
  }

  fs.rmdirSync(dir, { recursive: true })
  createDirectory(options)
}

async function copyApplicationFiles(options) {
  const files = [
    'config',
    'src',
    '.eslintrc',
    '.gitignore',
    '.nvmrc',
    '.stylelintrc',
    'CHANGELOG.md',
    'LICENSE',
    'package.json',
    'README.md',
  ]

  return files.forEach(f => {
    return fs.copy(`${options.templateDirectory}/${f}`, `${options.applicationDirectory}/${f}`, err => {
      if (f === 'package.json') rewritePackage(options)
      if (err) return console.error(err)
    })
  })
}

async function rewritePackage(options) {
  if (fs.existsSync(`${options.applicationDirectory}/package.json`)) {
    const file = require(`${options.applicationDirectory}/package.json`);
    delete(file.bin)
    delete(file.devDependencies)

    fs.writeFile(`${options.applicationDirectory}/package.json`, JSON.stringify(file, null, 2), function writeJSON(err) {
      if (err) return console.log(err);
    });
  }
}

async function startStoryBook(options) {
  const result = await execa('yarn', ['sb'], {
    cwd: options.applicationDirectory,
  })

  if (result.failed) {
    return Promise.reject(new Error('Failed to execute command yarn start'))
  }

  return
}

export async function createStoryBlocks(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
    applicationDirectory: options.targetDirectory || process.cwd() + '/' + options.dirName,
  }

  const currentFileUrl = import.meta.url
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    '../../',
    '.'
  )

  options.templateDirectory = templateDir

  try {
    await access(templateDir, fs.constants.R_OK)
  } catch(err) {
    error('ERROR', 'The package or the app directory cannot be found.')
    process.exit(1)
  }

  const tasks = new Listr([
    {
      title: `Creating StoryBlocks directory in ${options.targetDirectory}`,
      task: () => createDirectory(options),
    },
    {
      title: `Copying application files in ${options.applicationDirectory}`,
      task: () => copyApplicationFiles(options),
    },
    {
      title: 'Installing packages. This might take a couple of minutes.',
      task: () => projectInstall({
        cwd: options.applicationDirectory,
        prefer: 'yarn',
      }),
    },
    // {
    //   title: 'Launch Storybook',
    //   task: () => startStoryBook(options),
    // }
  ])

  await tasks.run()

  indent.nl(1)
  success.b('SUCCESS!')
  indent.nl(1)
  log('You can launch your storyblocks by typing:')
  indent.nl(1).space(2)
  info(`cd ${options.dirName}`)
  indent.space(2)
  info(`yarn sb`)

  return true
}
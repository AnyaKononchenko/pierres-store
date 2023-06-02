import fs from 'fs'
import fsExtra from 'fs-extra'

const removeFile = (path: string) => {
  if (!path.match(/default-.+\.png/)) {
    fs.stat(
      `./src/public/${path}`,
      (err: NodeJS.ErrnoException | null, stats: fs.Stats) => {
        if (err) {
          return console.error(err)
        }

        fs.unlink(
          `./src/public/${path}`,
          (err: NodeJS.ErrnoException | null) => {
            if (err) return console.log(err)
            console.log('File deleted successfully')
          }
        )
      }
    )
  }
}

const moveFile = (oldPath: string, newPath: string) => {
  if (!oldPath.match(/default-.+\.png/)) {
    fsExtra.move(
      oldPath,
      newPath,
      (err: NodeJS.ErrnoException | null | undefined) => {
        if (err) return console.error(err)
        console.log('File is moved.')
      }
    )
  }
}

export { removeFile, moveFile }

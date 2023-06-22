import { css } from '@emotion/css'
import { message, Upload } from 'antd'
import React from 'react'
import cls from 'classnames'

const { Dragger } = Upload

function OwnUpload({
  children,
  fileList,
  setFileList,
  accept,
  maxCount,
  setFileListDelIds,
  listType,
  className,
  onChange,
  onPreview,
  onRemove,
  ...rest
}) {
  const OwnUploadStyles = css`
    .ant-upload-list-item {
      font-size: 1.1rem;
      .ant-upload-list-item-name {
        max-inline-size: 40ch;
      }
      .ant-upload-list-item-card-actions {
        margin-inline-start: auto;
      }
    }
    .text-btn {
      padding: 0rem 0.5rem;
    }
  `

  // console.log(fileList)
  const props = {
    onRemove: file => {
      console.log(file)
      setFileListDelIds && setFileListDelIds(prev => prev.concat(file.id))
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: file => {
      console.log(file)
      if (accept) {
        const acceptTypeList = accept.trim().split(',')
        let acceptedType = false

        acceptTypeList.forEach(type => {
          if (file.name.endsWith(type.trim())) acceptedType = true
        })

        if (!acceptedType) {
          const errorMessage = acceptTypeList
            .map((t, i, arr) => {
              const lastIndex = arr.length - 1 === i

              return lastIndex ? t : `${t} or`
            })
            .join(' ')

          message.error(`The file type must match (${errorMessage})`)
          return
        }
      }

      const newFileList = maxCount
        ? [...fileList, file].slice(-maxCount)
        : [...fileList, file]

      setFileList(newFileList)
      return false
    },

    fileList,
  }

  return (
    <div className={cls(OwnUploadStyles, className)}>
      <Dragger
        {...props}
        accept={accept}
        listType={listType || 'picture'}
        onChange={onChange}
        onPreview={onPreview}
        onRemove={onRemove}
        {...rest}
      >
        <div className="text-btn">{children}</div>
      </Dragger>
    </div>
  )
}

export default OwnUpload

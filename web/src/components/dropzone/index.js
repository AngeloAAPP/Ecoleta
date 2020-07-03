import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {FiUpload} from 'react-icons/fi'
import './styles.css'

const Dropzone = ({setImage}) => {
    const [fileUrl, setFileUrl] = useState('')
  const onDrop = useCallback(acceptedFiles => {
    try{
    const file = acceptedFiles[0];

    setFileUrl(URL.createObjectURL(file))
    setImage(file)
    }
    catch(err){return}
  }, [setImage])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: 'image/*'})

  return (
    <div className = "dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept = 'image/*' />
      {
        isDragActive ?
          <p>Solte a imagem para enviar ...</p> :
          (
              fileUrl ? <img src = {fileUrl} alt = "imagem do estabelecimento" /> :
          <p>
              <FiUpload/>
                Insira a imagem do estabelecimento
          </p>
          )
      }
    </div>
  )
}

export default Dropzone
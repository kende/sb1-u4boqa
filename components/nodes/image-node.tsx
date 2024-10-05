"use client"

import React, { useState, useCallback, useEffect } from 'react'
import { Handle, Position } from 'reactflow'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function ImageNode({ data, id, isConnectable }) {
  const [image, setImage] = useState(data.image || null)

  const onImageUpload = useCallback((event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const newImage = e.target.result
      setImage(newImage)
      if (typeof data.onChange === 'function') {
        data.onChange(id, { image: newImage })
      }
    }
    reader.readAsDataURL(file)
  }, [id, data])

  useEffect(() => {
    setImage(data.image)
  }, [data.image])

  return (
    <div className="bg-background border-2 border-primary rounded-md p-4 w-64">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <h3 className="text-lg font-semibold mb-2">Image Node</h3>
      {image ? (
        <img src={image} alt="Uploaded" className="w-full h-40 object-cover mb-2 rounded" />
      ) : (
        <div className="w-full h-40 bg-muted flex items-center justify-center mb-2 rounded">
          No image uploaded
        </div>
      )}
      <Input type="file" accept="image/*" onChange={onImageUpload} className="mb-2" />
      <Button onClick={() => {
        setImage(null)
        if (typeof data.onChange === 'function') {
          data.onChange(id, { image: null })
        }
      }} variant="outline" className="w-full">
        Clear Image
      </Button>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  )
}
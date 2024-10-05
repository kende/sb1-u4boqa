"use client"

import React, { useState, useEffect } from 'react'
import { Handle, Position } from 'reactflow'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function CardNode({ data, id, isConnectable }) {
  const [title, setTitle] = useState(data.title || '')
  const [content, setContent] = useState(data.content || '')

  useEffect(() => {
    setTitle(data.title || '')
    setContent(data.content || '')
  }, [data.title, data.content])

  const handleTitleChange = (e) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    data.onChange(id, { title: newTitle, content })
  }

  const handleContentChange = (e) => {
    const newContent = e.target.value
    setContent(newContent)
    data.onChange(id, { title, content: newContent })
  }

  return (
    <div className="bg-background border-2 border-primary rounded-md p-4 w-64">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <h3 className="text-lg font-semibold mb-2">Card Node</h3>
      <Input
        placeholder="Card Title"
        value={title}
        onChange={handleTitleChange}
        className="mb-2"
      />
      <Textarea
        placeholder="Card Content"
        value={content}
        onChange={handleContentChange}
        rows={3}
      />
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  )
}
"use client"

import React, { useState, useEffect } from 'react'
import { Handle, Position } from 'reactflow'
import { Textarea } from '@/components/ui/textarea'

export function NoteNode({ data, id, isConnectable }) {
  const [note, setNote] = useState(data.note || '')

  useEffect(() => {
    setNote(data.note || '')
  }, [data.note])

  const handleChange = (e) => {
    const newNote = e.target.value
    setNote(newNote)
    data.onChange(id, { note: newNote })
  }

  return (
    <div className="bg-background border-2 border-primary rounded-md p-4 w-64">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <h3 className="text-lg font-semibold mb-2">Note Node</h3>
      <Textarea
        placeholder="Enter your note here..."
        value={note}
        onChange={handleChange}
        rows={4}
      />
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  )
}
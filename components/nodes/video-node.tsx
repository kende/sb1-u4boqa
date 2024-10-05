"use client"

import React, { useState, useEffect } from 'react'
import { Handle, Position } from 'reactflow'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function VideoNode({ data, id, isConnectable }) {
  const [videoUrl, setVideoUrl] = useState(data.videoUrl || '')

  useEffect(() => {
    setVideoUrl(data.videoUrl || '')
  }, [data.videoUrl])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (typeof data.onChange === 'function') {
      data.onChange(id, { videoUrl })
    }
  }

  return (
    <div className="bg-background border-2 border-primary rounded-md p-4 w-64">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <h3 className="text-lg font-semibold mb-2">Video Node</h3>
      <form onSubmit={handleSubmit}>
        <Input
          type="url"
          placeholder="Enter video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="mb-2"
        />
        <Button type="submit" className="w-full">Load Video</Button>
      </form>
      {videoUrl && (
        <div className="mt-2">
          <iframe
            width="100%"
            height="150"
            src={videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  )
}
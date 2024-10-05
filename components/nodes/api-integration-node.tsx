"use client"

import React, { useState, useEffect } from 'react'
import { Handle, Position } from 'reactflow'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function APIIntegrationNode({ data, id, isConnectable }) {
  const [apiUrl, setApiUrl] = useState(data.apiUrl || '')
  const [method, setMethod] = useState(data.method || 'GET')

  useEffect(() => {
    setApiUrl(data.apiUrl || '')
    setMethod(data.method || 'GET')
  }, [data.apiUrl, data.method])

  const handleApiUrlChange = (e) => {
    const newApiUrl = e.target.value
    setApiUrl(newApiUrl)
    data.onChange(id, { apiUrl: newApiUrl, method })
  }

  const handleMethodChange = (newMethod) => {
    setMethod(newMethod)
    data.onChange(id, { apiUrl, method: newMethod })
  }

  return (
    <div className="bg-background border-2 border-primary rounded-md p-4 w-64">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <h3 className="text-lg font-semibold mb-2">API Integration Node</h3>
      <Input
        placeholder="API URL"
        value={apiUrl}
        onChange={handleApiUrlChange}
        className="mb-2"
      />
      <Select onValueChange={handleMethodChange} value={method}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="HTTP Method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="GET">GET</SelectItem>
          <SelectItem value="POST">POST</SelectItem>
          <SelectItem value="PUT">PUT</SelectItem>
          <SelectItem value="DELETE">DELETE</SelectItem>
        </SelectContent>
      </Select>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  )
}
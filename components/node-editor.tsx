"use client"

import React, { useState, useCallback, useEffect, useRef } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ImageNode } from '@/components/nodes/image-node'
import { VideoNode } from '@/components/nodes/video-node'
import { NoteNode } from '@/components/nodes/note-node'
import { CardNode } from '@/components/nodes/card-node'
import { EventTriggerNode } from '@/components/nodes/event-trigger-node'
import { APIIntegrationNode } from '@/components/nodes/api-integration-node'
import { ThemeToggle } from '@/components/theme-toggle'

const nodeTypes = {
  imageNode: ImageNode,
  videoNode: VideoNode,
  noteNode: NoteNode,
  cardNode: CardNode,
  eventTriggerNode: EventTriggerNode,
  apiIntegrationNode: APIIntegrationNode,
}

const NodeEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [workflowName, setWorkflowName] = useState('Untitled Workflow')
  const reactFlowWrapper = useRef(null)

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const updateNodeData = useCallback((nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, ...newData } }
        }
        return node
      })
    )
  }, [setNodes])

  const addNode = (type) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { 
        label: `${type} node`,
        onChange: (id, newData) => updateNodeData(id, newData)
      },
    }
    setNodes((nds) => nds.concat(newNode))
  }

  const saveWorkflow = () => {
    const workflow = { 
      nodes: nodes.map(node => ({
        ...node,
        data: { ...node.data, onChange: undefined }
      })), 
      edges, 
      name: workflowName 
    }
    const json = JSON.stringify(workflow)
    const blob = new Blob([json], { type: 'application/json' })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = `${workflowName}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const loadWorkflow = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      const workflow = JSON.parse(event.target.result)
      const nodesWithOnChange = workflow.nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          onChange: (id, newData) => updateNodeData(id, newData)
        }
      }))
      setNodes(nodesWithOnChange)
      setEdges(workflow.edges)
      setWorkflowName(workflow.name)
    }
    reader.readAsText(file)
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex items-center justify-between p-2 bg-background border-b">
        <div className="flex items-center">
          <Input
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="w-64 mr-2"
          />
          <ThemeToggle />
        </div>
        <div className="flex flex-wrap gap-1">
          <Button size="sm" onClick={() => addNode('imageNode')}>Image</Button>
          <Button size="sm" onClick={() => addNode('videoNode')}>Video</Button>
          <Button size="sm" onClick={() => addNode('noteNode')}>Note</Button>
          <Button size="sm" onClick={() => addNode('cardNode')}>Card</Button>
          <Button size="sm" onClick={() => addNode('eventTriggerNode')}>Event</Button>
          <Button size="sm" onClick={() => addNode('apiIntegrationNode')}>API</Button>
          <Button size="sm" onClick={saveWorkflow}>Save</Button>
          <Input type="file" onChange={loadWorkflow} accept=".json" className="w-auto" size="sm" />
        </div>
      </div>
      <div ref={reactFlowWrapper} className="flex-grow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  )
}

const ResponsiveNodeEditor = () => (
  <ReactFlowProvider>
    <NodeEditor />
  </ReactFlowProvider>
)

export default ResponsiveNodeEditor
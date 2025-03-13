import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToolLayout } from '@/components/tool-layout';
import { Plus, Trash2, Edit2, Save, X, Download, Upload } from 'lucide-react';

interface Node {
  id: string;
  text: string;
  x: number;
  y: number;
  parentId: string | null;
  children: string[];
  color?: string;
  fontSize?: number;
}

export default function MindMap() {
  const [nodes, setNodes] = useState<{ [key: string]: Node }>({
    'root': {
      id: 'root',
      text: 'Central Idea',
      x: window.innerWidth / 2,
      y: window.innerHeight / 3,
      parentId: null,
      children: [],
      color: '#3b82f6',
      fontSize: 20
    }
  });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [newNodeText, setNewNodeText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        setScale(prev => Math.min(Math.max(prev * delta, 0.5), 2));
      }
    };

    const svg = svgRef.current;
    svg?.addEventListener('wheel', handleWheel, { passive: false });
    return () => svg?.removeEventListener('wheel', handleWheel);
  }, []);

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    if (e.button === 2) return; // Ignore right click
    setSelectedNode(nodeId);
    setIsDragging(true);
    const node = nodes[nodeId];
    setDragOffset({
      x: e.clientX - node.x,
      y: e.clientY - node.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedNode) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    setNodes(prev => ({
      ...prev,
      [selectedNode]: {
        ...prev[selectedNode],
        x: newX,
        y: newY
      }
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const addNode = () => {
    if (!selectedNode || !newNodeText.trim()) return;

    const parentNode = nodes[selectedNode];
    const angle = (Math.PI * 2 * (parentNode.children.length + 1)) / 
                 (parentNode.children.length + 2);
    const distance = 150;
    
    const newNodeId = Date.now().toString();
    const newNode: Node = {
      id: newNodeId,
      text: newNodeText,
      x: parentNode.x + Math.cos(angle) * distance,
      y: parentNode.y + Math.sin(angle) * distance,
      parentId: selectedNode,
      children: [],
      color: getRandomColor(),
      fontSize: 16
    };

    setNodes(prev => ({
      ...prev,
      [newNodeId]: newNode,
      [selectedNode]: {
        ...prev[selectedNode],
        children: [...prev[selectedNode].children, newNodeId]
      }
    }));

    setNewNodeText('');
  };

  const updateNodeText = (nodeId: string, text: string) => {
    if (nodeId === 'root' && !text.trim()) return;
    
    setNodes(prev => ({
      ...prev,
      [nodeId]: {
        ...prev[nodeId],
        text
      }
    }));
    setEditingNode(null);
  };

  const deleteNode = (nodeId: string) => {
    if (nodeId === 'root') return;

    const nodesToDelete = new Set<string>();
    const getChildrenToDelete = (id: string) => {
      nodesToDelete.add(id);
      nodes[id].children.forEach(getChildrenToDelete);
    };
    getChildrenToDelete(nodeId);

    const parentId = nodes[nodeId].parentId;
    if (!parentId) return;

    setNodes(prev => {
      const newNodes = { ...prev };
      nodesToDelete.forEach(id => delete newNodes[id]);
      newNodes[parentId] = {
        ...newNodes[parentId],
        children: newNodes[parentId].children.filter(id => id !== nodeId)
      };
      return newNodes;
    });

    if (selectedNode === nodeId) setSelectedNode(null);
  };

  const getRandomColor = () => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const exportMindMap = () => {
    const data = JSON.stringify(nodes);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mindmap.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importMindMap = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedNodes = JSON.parse(event.target?.result as string);
        setNodes(importedNodes);
      } catch (error) {
        console.error('Error importing mind map:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <ToolLayout title="Mind Map" description="Create and organize your thoughts visually">
      <Card className="w-full p-6 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter node text"
              value={newNodeText}
              onChange={(e) => setNewNodeText(e.target.value)}
              className="w-64"
            />
            <Button
              onClick={addNode}
              disabled={!selectedNode || !newNodeText.trim()}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Node
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportMindMap}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <label>
              <Button variant="outline" asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </span>
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={importMindMap}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden bg-secondary/50">
          <svg
            ref={svgRef}
            className="w-full h-[600px]"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <g transform={`scale(${scale})`}>
              {/* Draw connections */}
              {Object.values(nodes).map(node => 
                node.parentId && (
                  <line
                    key={`line-${node.id}`}
                    x1={nodes[node.parentId].x}
                    y1={nodes[node.parentId].y}
                    x2={node.x}
                    y2={node.y}
                    stroke={node.color}
                    strokeWidth="2"
                    className="transition-all duration-200"
                  />
                )
              )}

              {/* Draw nodes */}
              {Object.values(nodes).map(node => (
                <g
                  key={node.id}
                  transform={`translate(${node.x},${node.y})`}
                  onMouseDown={(e) => handleMouseDown(e, node.id)}
                  className="cursor-move"
                >
                  <circle
                    r={node.id === 'root' ? 50 : 40}
                    fill={node.color}
                    className={`transition-all duration-200 ${
                      selectedNode === node.id ? 'stroke-primary stroke-2' : ''
                    }`}
                  />
                  {editingNode === node.id ? (
                    <foreignObject
                      x="-60"
                      y="-20"
                      width="120"
                      height="40"
                      className="overflow-visible"
                    >
                      <div className="flex gap-1">
                        <Input
                          value={node.text}
                          onChange={(e) => updateNodeText(node.id, e.target.value)}
                          className="h-8 text-center"
                          autoFocus
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => setEditingNode(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </foreignObject>
                  ) : (
                    <>
                      <text
                        textAnchor="middle"
                        dy="0.3em"
                        fill="white"
                        fontSize={node.fontSize}
                        className="pointer-events-none select-none"
                      >
                        {node.text}
                      </text>
                      {selectedNode === node.id && node.id !== 'root' && (
                        <g className="transition-opacity">
                          <circle
                            cx="30"
                            cy="-30"
                            r="15"
                            fill="white"
                            className="cursor-pointer hover:fill-destructive"
                            onClick={() => deleteNode(node.id)}
                          />
                          <Trash2
                            className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-destructive"
                            style={{ transform: 'translate(24px, -38px)' }}
                          />
                          <circle
                            cx="-30"
                            cy="-30"
                            r="15"
                            fill="white"
                            className="cursor-pointer hover:fill-primary"
                            onClick={() => setEditingNode(node.id)}
                          />
                          <Edit2
                            className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-primary"
                            style={{ transform: 'translate(-36px, -38px)' }}
                          />
                        </g>
                      )}
                    </>
                  )}
                </g>
              ))}
            </g>
          </svg>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>Tips:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Click a node to select it</li>
            <li>Drag nodes to reposition them</li>
            <li>Use mouse wheel + Ctrl to zoom in/out</li>
            <li>Click edit/delete icons when a node is selected</li>
          </ul>
        </div>
      </Card>
    </ToolLayout>
  );
} 
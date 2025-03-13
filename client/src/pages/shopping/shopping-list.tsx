import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ToolLayout } from '@/components/tool-layout';
import { Plus, Trash2, ShoppingCart } from 'lucide-react';

interface ShoppingItem {
  id: number;
  name: string;
  quantity: string;
  category: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  notes?: string;
}

const ShoppingList: React.FC<RouteComponentProps> = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    category: 'groceries',
    priority: 'medium' as const,
    notes: ''
  });

  const categories = [
    { value: 'groceries', label: 'Groceries' },
    { value: 'household', label: 'Household' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'other', label: 'Other' }
  ];

  const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  const addItem = () => {
    if (!newItem.name) return;

    const item: ShoppingItem = {
      id: Date.now(),
      name: newItem.name,
      quantity: newItem.quantity,
      category: newItem.category,
      completed: false,
      priority: newItem.priority,
      notes: newItem.notes
    };

    setItems([...items, item]);
    setNewItem({
      name: '',
      quantity: '',
      category: 'groceries',
      priority: 'medium',
      notes: ''
    });
  };

  const toggleItem = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getItemsByCategory = (category: string) => {
    return items.filter(item => item.category === category);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return '';
    }
  };

  const getTotalItems = () => items.length;
  const getCompletedItems = () => items.filter(item => item.completed).length;

  return (
    <ToolLayout title="Shopping List" description="Create and manage your shopping lists">
      <Card className="w-full max-w-3xl mx-auto p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Item Name</Label>
              <Input
                placeholder="Enter item name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input
                placeholder="Enter quantity"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={newItem.category}
                onValueChange={(value) => setNewItem({ ...newItem, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select
                value={newItem.priority}
                onValueChange={(value: 'low' | 'medium' | 'high') => 
                  setNewItem({ ...newItem, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(priority => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Notes (optional)</Label>
              <Input
                placeholder="Add any notes"
                value={newItem.notes}
                onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
              />
            </div>
          </div>

          <Button onClick={addItem} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>

          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <p>Total Items: {getTotalItems()}</p>
            <p>Completed: {getCompletedItems()}</p>
          </div>

          <div className="space-y-6">
            {categories.map(category => {
              const categoryItems = getItemsByCategory(category.value);
              if (categoryItems.length === 0) return null;

              return (
                <div key={category.value} className="space-y-2">
                  <h3 className="text-lg font-semibold">{category.label}</h3>
                  <div className="space-y-2">
                    {categoryItems.map(item => (
                      <div
                        key={item.id}
                        className="p-4 bg-secondary rounded-lg flex items-center space-x-4"
                      >
                        <Checkbox
                          checked={item.completed}
                          onCheckedChange={() => toggleItem(item.id)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <p className={`font-medium ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {item.name}
                            </p>
                            <span className={`text-sm ${getPriorityColor(item.priority)}`}>
                              • {item.priority}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity && `Quantity: ${item.quantity}`}
                            {item.notes && ` • ${item.notes}`}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {items.length === 0 && (
            <div className="text-center text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Your shopping list is empty</p>
              <p className="text-sm">Add items to get started</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default ShoppingList; 
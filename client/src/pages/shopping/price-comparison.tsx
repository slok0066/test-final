import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToolLayout } from '@/components/tool-layout';
import { Trash2 } from 'lucide-react';

interface Item {
  id: number;
  name: string;
  prices: {
    store: string;
    price: number;
    unit?: string;
    notes?: string;
  }[];
}

const PriceComparison: React.FC<RouteComponentProps> = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState({
    name: '',
    store: '',
    price: '',
    unit: '',
    notes: ''
  });

  const addPrice = (itemId: number) => {
    if (!newItem.store || !newItem.price) return;

    setItems(items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          prices: [...item.prices, {
            store: newItem.store,
            price: parseFloat(newItem.price),
            unit: newItem.unit,
            notes: newItem.notes
          }]
        };
      }
      return item;
    }));

    setNewItem({
      ...newItem,
      store: '',
      price: '',
      unit: '',
      notes: ''
    });
  };

  const addItem = () => {
    if (!newItem.name || !newItem.store || !newItem.price) return;

    const item: Item = {
      id: Date.now(),
      name: newItem.name,
      prices: [{
        store: newItem.store,
        price: parseFloat(newItem.price),
        unit: newItem.unit,
        notes: newItem.notes
      }]
    };

    setItems([...items, item]);
    setNewItem({
      name: '',
      store: '',
      price: '',
      unit: '',
      notes: ''
    });
  };

  const removePrice = (itemId: number, priceIndex: number) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          prices: item.prices.filter((_, index) => index !== priceIndex)
        };
      }
      return item;
    }));
  };

  const removeItem = (itemId: number) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const getBestPrice = (prices: Item['prices']) => {
    return Math.min(...prices.map(p => p.price));
  };

  return (
    <ToolLayout title="Price Comparison" description="Compare prices across different stores">
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
              <Label>Store Name</Label>
              <Input
                placeholder="Enter store name"
                value={newItem.store}
                onChange={(e) => setNewItem({ ...newItem, store: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Price</Label>
              <Input
                type="number"
                placeholder="Enter price"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Unit (optional)</Label>
              <Input
                placeholder="e.g., per kg, per piece"
                value={newItem.unit}
                onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
              />
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
            Add Item
          </Button>

          {items.map(item => (
            <Card key={item.id} className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addPrice(item.id)}
                      disabled={!newItem.store || !newItem.price}
                    >
                      Add Price
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  {item.prices.map((price, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg flex justify-between items-center ${
                        price.price === getBestPrice(item.prices) ? 'bg-green-100 dark:bg-green-900' : 'bg-secondary'
                      }`}
                    >
                      <div>
                        <p className="font-medium">{price.store}</p>
                        <p className="text-sm text-muted-foreground">
                          ${price.price.toFixed(2)} {price.unit}
                          {price.notes && ` - ${price.notes}`}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePrice(item.id, index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}

          {items.length === 0 && (
            <div className="text-center text-muted-foreground">
              <p>No items added yet</p>
              <p className="text-sm">Add an item to start comparing prices</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}

export default PriceComparison; 
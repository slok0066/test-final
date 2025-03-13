import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToolLayout } from '@/components/tool-layout';
import { Calculator, Plus, Trash2 } from 'lucide-react';

interface DiscountItem {
  id: number;
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  finalPrice: number;
  description?: string;
}

const DiscountCalculator: React.FC<RouteComponentProps> = () => {
  const [items, setItems] = useState<DiscountItem[]>([]);
  const [newItem, setNewItem] = useState({
    originalPrice: '',
    discountPercentage: '',
    description: ''
  });

  const calculateDiscount = (originalPrice: number, discountPercentage: number) => {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const finalPrice = originalPrice - discountAmount;
    return {
      discountAmount: parseFloat(discountAmount.toFixed(2)),
      finalPrice: parseFloat(finalPrice.toFixed(2))
    };
  };

  const addItem = () => {
    if (!newItem.originalPrice || !newItem.discountPercentage) return;

    const originalPrice = parseFloat(newItem.originalPrice);
    const discountPercentage = parseFloat(newItem.discountPercentage);
    const { discountAmount, finalPrice } = calculateDiscount(originalPrice, discountPercentage);

    const item: DiscountItem = {
      id: Date.now(),
      originalPrice,
      discountPercentage,
      discountAmount,
      finalPrice,
      description: newItem.description
    };

    setItems([...items, item]);
    setNewItem({
      originalPrice: '',
      discountPercentage: '',
      description: ''
    });
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getTotalSavings = () => {
    return items.reduce((total, item) => total + item.discountAmount, 0).toFixed(2);
  };

  const getTotalOriginal = () => {
    return items.reduce((total, item) => total + item.originalPrice, 0).toFixed(2);
  };

  const getTotalFinal = () => {
    return items.reduce((total, item) => total + item.finalPrice, 0).toFixed(2);
  };

  return (
    <ToolLayout title="Discount Calculator" description="Calculate discounts and final prices">
      <Card className="w-full max-w-3xl mx-auto p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Original Price ($)</Label>
              <Input
                type="number"
                placeholder="Enter original price"
                value={newItem.originalPrice}
                onChange={(e) => setNewItem({ ...newItem, originalPrice: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Discount (%)</Label>
              <Input
                type="number"
                placeholder="Enter discount percentage"
                value={newItem.discountPercentage}
                onChange={(e) => setNewItem({ ...newItem, discountPercentage: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description (optional)</Label>
              <Input
                placeholder="Add description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />
            </div>
          </div>

          <Button onClick={addItem} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>

          {items.map(item => (
            <Card key={item.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  {item.description && (
                    <p className="font-medium">{item.description}</p>
                  )}
                  <div className="space-y-1 text-sm">
                    <p>Original Price: <span className="font-medium">${item.originalPrice.toFixed(2)}</span></p>
                    <p>Discount: <span className="font-medium">{item.discountPercentage}% (${item.discountAmount})</span></p>
                    <p className="text-green-600 dark:text-green-400">
                      Final Price: <span className="font-medium">${item.finalPrice.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}

          {items.length > 0 && (
            <Card className="p-4 bg-secondary">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Original:</span>
                  <span className="font-medium">${getTotalOriginal()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Savings:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">${getTotalSavings()}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span>Total Final Price:</span>
                  <span>${getTotalFinal()}</span>
                </div>
              </div>
            </Card>
          )}

          {items.length === 0 && (
            <div className="text-center text-muted-foreground">
              <Calculator className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No items added yet</p>
              <p className="text-sm">Add items to calculate discounts</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default DiscountCalculator; 
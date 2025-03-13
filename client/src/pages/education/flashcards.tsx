import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';
import { Plus, ChevronLeft, ChevronRight, Trash2, Edit2, Star, RotateCw } from 'lucide-react';
import { RouteComponentProps } from 'wouter';

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  category: string;
  mastered: boolean;
  lastReviewed?: Date;
  reviewCount: number;
}

export default function Flashcards() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [newCard, setNewCard] = useState({
    question: '',
    answer: '',
    category: 'general'
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [studyMode, setStudyMode] = useState<'all' | 'unmastered' | 'mastered'>('all');

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'math', label: 'Mathematics' },
    { value: 'science', label: 'Science' },
    { value: 'history', label: 'History' },
    { value: 'language', label: 'Language' },
    { value: 'custom', label: 'Custom' }
  ];

  const addCard = () => {
    if (!newCard.question || !newCard.answer) return;

    setCards([
      ...cards,
      {
        id: Date.now(),
        question: newCard.question,
        answer: newCard.answer,
        category: newCard.category,
        mastered: false,
        reviewCount: 0
      }
    ]);
    setNewCard({ question: '', answer: '', category: 'general' });
    setEditMode(false);
  };

  const updateCard = (id: number) => {
    setCards(cards.map(card =>
      card.id === id ? {
        ...card,
        question: newCard.question,
        answer: newCard.answer,
        category: newCard.category
      } : card
    ));
    setNewCard({ question: '', answer: '', category: 'general' });
    setEditMode(false);
  };

  const deleteCard = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
    if (currentIndex >= cards.length - 1) {
      setCurrentIndex(Math.max(0, cards.length - 2));
    }
  };

  const startEdit = (card: Flashcard) => {
    setNewCard({
      question: card.question,
      answer: card.answer,
      category: card.category
    });
    setEditMode(true);
  };

  const toggleMastered = (id: number) => {
    setCards(cards.map(card =>
      card.id === id ? {
        ...card,
        mastered: !card.mastered,
        lastReviewed: new Date()
      } : card
    ));
  };

  const nextCard = () => {
    const filteredCards = getFilteredCards();
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const previousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const getFilteredCards = () => {
    let filtered = cards;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(card => card.category === selectedCategory);
    }
    if (studyMode !== 'all') {
      filtered = filtered.filter(card => 
        studyMode === 'mastered' ? card.mastered : !card.mastered
      );
    }
    return filtered;
  };

  const filteredCards = getFilteredCards();

  return (
    <ToolLayout title="Flashcards" description="Create and study with flashcards">
      <Card className="w-full max-w-3xl mx-auto p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Question</Label>
              <Textarea
                placeholder="Enter question"
                value={newCard.question}
                onChange={(e) => setNewCard({
                  ...newCard,
                  question: e.target.value
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Answer</Label>
              <Textarea
                placeholder="Enter answer"
                value={newCard.answer}
                onChange={(e) => setNewCard({
                  ...newCard,
                  answer: e.target.value
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={newCard.category}
                onValueChange={(value) => setNewCard({
                  ...newCard,
                  category: value
                })}
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
          </div>

          <Button 
            onClick={() => editMode ? updateCard(filteredCards[currentIndex].id) : addCard()}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            {editMode ? 'Update Card' : 'Add Card'}
          </Button>

          {cards.length > 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Filter by Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Study Mode</Label>
                  <Select value={studyMode} onValueChange={(value: 'all' | 'unmastered' | 'mastered') => setStudyMode(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cards</SelectItem>
                      <SelectItem value="unmastered">Unmastered Only</SelectItem>
                      <SelectItem value="mastered">Mastered Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Card {currentIndex + 1} of {filteredCards.length}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={shuffleCards}
                    >
                      <RotateCw className="h-4 w-4 mr-2" />
                      Shuffle
                    </Button>
                  </div>

                  <div 
                    className="min-h-[200px] flex items-center justify-center cursor-pointer bg-secondary rounded-lg p-6 text-center"
                    onClick={() => setShowAnswer(!showAnswer)}
                  >
                    <div className="space-y-2">
                      <p className="text-lg">
                        {showAnswer ? filteredCards[currentIndex].answer : filteredCards[currentIndex].question}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Click to {showAnswer ? 'show question' : 'show answer'}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={() => previousCard()}
                      disabled={currentIndex === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEdit(filteredCards[currentIndex])}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={filteredCards[currentIndex].mastered ? "default" : "ghost"}
                        size="sm"
                        onClick={() => toggleMastered(filteredCards[currentIndex].id)}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteCard(filteredCards[currentIndex].id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => nextCard()}
                      disabled={currentIndex === filteredCards.length - 1}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Cards</p>
                  <p className="text-2xl font-bold">{cards.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mastered</p>
                  <p className="text-2xl font-bold">
                    {cards.filter(card => card.mastered).length}
                  </p>
                </div>
              </div>
            </div>
          )}

          {cards.length === 0 && (
            <div className="text-center text-muted-foreground">
              <p>No flashcards yet</p>
              <p className="text-sm">Add your first card to get started</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
} 
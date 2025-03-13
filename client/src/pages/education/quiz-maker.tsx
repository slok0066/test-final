import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';
import { Plus, Edit2, Trash2, Play, Save, CheckCircle2, XCircle } from 'lucide-react';
import { RouteComponentProps } from 'wouter';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  type: 'multiple' | 'boolean';
  category: string;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: QuizQuestion[];
  category: string;
  createdAt: Date;
}

interface QuizAttempt {
  id: number;
  quizId: number;
  answers: number[];
  score: number;
  completedAt: Date;
}

export default function QuizMaker() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    description: '',
    category: 'general',
    questions: [] as QuizQuestion[]
  });
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    type: 'multiple' as const,
    category: 'general'
  });

  const categories = [
    { value: 'general', label: 'General Knowledge' },
    { value: 'math', label: 'Mathematics' },
    { value: 'science', label: 'Science' },
    { value: 'history', label: 'History' },
    { value: 'language', label: 'Language' },
    { value: 'custom', label: 'Custom' }
  ];

  const addQuiz = () => {
    if (!newQuiz.title || newQuiz.questions.length === 0) return;

    const quiz: Quiz = {
      id: Date.now(),
      title: newQuiz.title,
      description: newQuiz.description,
      questions: newQuiz.questions,
      category: newQuiz.category,
      createdAt: new Date()
    };

    setQuizzes([quiz, ...quizzes]);
    setNewQuiz({
      title: '',
      description: '',
      category: 'general',
      questions: []
    });
  };

  const addQuestion = () => {
    if (!newQuestion.question || newQuestion.options.some(opt => !opt)) return;

    const question: QuizQuestion = {
      id: Date.now(),
      ...newQuestion
    };

    if (editMode && selectedQuiz) {
      const updatedQuiz = {
        ...selectedQuiz,
        questions: [...selectedQuiz.questions, question]
      };
      setSelectedQuiz(updatedQuiz);
      setQuizzes(quizzes.map(q => q.id === selectedQuiz.id ? updatedQuiz : q));
    } else {
      setNewQuiz({
        ...newQuiz,
        questions: [...newQuiz.questions, question]
      });
    }

    setNewQuestion({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      type: 'multiple',
      category: 'general'
    });
  };

  const removeQuestion = (questionId: number) => {
    if (editMode && selectedQuiz) {
      const updatedQuiz = {
        ...selectedQuiz,
        questions: selectedQuiz.questions.filter(q => q.id !== questionId)
      };
      setSelectedQuiz(updatedQuiz);
      setQuizzes(quizzes.map(q => q.id === selectedQuiz.id ? updatedQuiz : q));
    } else {
      setNewQuiz({
        ...newQuiz,
        questions: newQuiz.questions.filter(q => q.id !== questionId)
      });
    }
  };

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setQuizMode(true);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
  };

  const handleAnswer = (answerIndex: number) => {
    if (!selectedQuiz) return;
    
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const getCurrentQuestion = () => {
    if (!selectedQuiz || currentQuestionIndex >= selectedQuiz.questions.length) {
      return null;
    }
    return selectedQuiz.questions[currentQuestionIndex];
  };

  const calculateScore = () => {
    if (!selectedQuiz) return 0;
    const correctAnswers = userAnswers.filter(
      (answer, index) => answer === selectedQuiz.questions[index].correctAnswer
    );
    return (correctAnswers.length / selectedQuiz.questions.length) * 100;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <ToolLayout title="Quiz Maker" description="Create and take quizzes">
      {!quizMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quiz Creation */}
          <Card className="p-4 space-y-4">
            <div className="space-y-4">
              <Input
                placeholder="Quiz title"
                value={editMode ? selectedQuiz?.title : newQuiz.title}
                onChange={(e) => editMode
                  ? setSelectedQuiz({ ...selectedQuiz!, title: e.target.value })
                  : setNewQuiz({ ...newQuiz, title: e.target.value })
                }
              />

              <Textarea
                placeholder="Quiz description"
                value={editMode ? selectedQuiz?.description : newQuiz.description}
                onChange={(e) => editMode
                  ? setSelectedQuiz({ ...selectedQuiz!, description: e.target.value })
                  : setNewQuiz({ ...newQuiz, description: e.target.value })
                }
              />

              <Select
                value={editMode ? selectedQuiz?.category : newQuiz.category}
                onValueChange={(value) => editMode
                  ? setSelectedQuiz({ ...selectedQuiz!, category: value })
                  : setNewQuiz({ ...newQuiz, category: value })
                }
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

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>New Question</Label>
                  <Textarea
                    placeholder="Enter question"
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({
                      ...newQuestion,
                      question: e.target.value
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Options</Label>
                  {newQuestion.options.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...newQuestion.options];
                          newOptions[index] = e.target.value;
                          setNewQuestion({
                            ...newQuestion,
                            options: newOptions
                          });
                        }}
                      />
                      <Button
                        variant={newQuestion.correctAnswer === index ? "default" : "outline"}
                        onClick={() => setNewQuestion({
                          ...newQuestion,
                          correctAnswer: index
                        })}
                      >
                        Correct
                      </Button>
                    </div>
                  ))}
                </div>

                <Textarea
                  placeholder="Explanation (optional)"
                  value={newQuestion.explanation}
                  onChange={(e) => setNewQuestion({
                    ...newQuestion,
                    explanation: e.target.value
                  })}
                />

                <Button onClick={addQuestion} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Questions</Label>
                {(editMode ? selectedQuiz?.questions : newQuiz.questions).map((question, index) => (
                  <div
                    key={question.id}
                    className="p-3 bg-secondary rounded-lg flex justify-between items-start"
                  >
                    <div>
                      <p className="font-medium">{index + 1}. {question.question}</p>
                      <div className="text-sm text-muted-foreground">
                        {question.options.map((option, i) => (
                          <p key={i} className={i === question.correctAnswer ? 'text-green-500' : ''}>
                            {String.fromCharCode(65 + i)}. {option}
                          </p>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(question.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                onClick={editMode ? () => {
                  setQuizzes(quizzes.map(q => q.id === selectedQuiz?.id ? selectedQuiz : q));
                  setSelectedQuiz(null);
                  setEditMode(false);
                } : addQuiz}
                className="w-full"
                disabled={(editMode ? selectedQuiz?.questions : newQuiz.questions).length === 0}
              >
                <Save className="mr-2 h-4 w-4" />
                {editMode ? 'Save Quiz' : 'Create Quiz'}
              </Button>
            </div>
          </Card>

          {/* Quiz List */}
          <Card className="p-4 space-y-4">
            <h3 className="font-semibold">Your Quizzes</h3>
            <div className="space-y-2">
              {quizzes.map(quiz => (
                <div
                  key={quiz.id}
                  className="p-4 bg-secondary rounded-lg space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{quiz.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {quiz.questions.length} questions • {formatDate(quiz.createdAt)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedQuiz(quiz);
                          setEditMode(true);
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startQuiz(quiz)}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {quizzes.length === 0 && (
                <div className="text-center text-muted-foreground">
                  <p>No quizzes created yet</p>
                  <p className="text-sm">Create your first quiz to get started</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      ) : (
        <Card className="p-6 max-w-2xl mx-auto">
          {!showResults ? (
            <div className="space-y-6">
              {selectedQuiz && (
                <>
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">{selectedQuiz.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
                    </p>
                  </div>

                  {(() => {
                    const currentQuestion = getCurrentQuestion();
                    if (!currentQuestion) return null;

                    return (
                      <div className="space-y-4">
                        <p className="text-lg">{currentQuestion.question}</p>
                        <div className="space-y-2">
                          {currentQuestion.options.map((option, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="w-full justify-start text-left"
                              onClick={() => handleAnswer(index)}
                            >
                              {String.fromCharCode(65 + index)}. {option}
                            </Button>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center">Quiz Results</h2>
              {selectedQuiz && (
                <>
                  <div className="text-center">
                    <p className="text-4xl font-bold mb-2">{calculateScore().toFixed(0)}%</p>
                    <p className="text-muted-foreground">
                      {userAnswers.filter((answer, index) => 
                        answer === selectedQuiz.questions[index].correctAnswer
                      ).length} out of {selectedQuiz.questions.length} correct
                    </p>
                  </div>

                  <div className="space-y-4">
                    {selectedQuiz.questions.map((question, index) => (
                      <div
                        key={question.id}
                        className="p-4 bg-secondary rounded-lg space-y-2"
                      >
                        <div className="flex items-start gap-2">
                          {userAnswers[index] === question.correctAnswer ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mt-1" />
                          )}
                          <div>
                            <p className="font-medium">{index + 1}. {question.question}</p>
                            <div className="space-y-1 mt-2">
                              {question.options.map((option, i) => (
                                <p
                                  key={i}
                                  className={`text-sm ${
                                    i === question.correctAnswer
                                      ? 'text-green-500 font-medium'
                                      : i === userAnswers[index]
                                      ? 'text-red-500'
                                      : 'text-muted-foreground'
                                  }`}
                                >
                                  {String.fromCharCode(65 + i)}. {option}
                                </p>
                              ))}
                            </div>
                            {question.explanation && (
                              <p className="text-sm text-muted-foreground mt-2">
                                Explanation: {question.explanation}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuizMode(false);
                    setSelectedQuiz(null);
                  }}
                >
                  Back to Quizzes
                </Button>
                <Button
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setUserAnswers([]);
                    setShowResults(false);
                  }}
                >
                  Retry Quiz
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}
    </ToolLayout>
  );
} 
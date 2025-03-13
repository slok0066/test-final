import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToolLayout } from '@/components/tool-layout';
import { Lock, Unlock, Copy, Eye, EyeOff } from 'lucide-react';
import CryptoJS from 'crypto-js';

const NoteEncryption: React.FC = () => {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const encrypt = () => {
    try {
      if (!text || !password) {
        setError('Please enter both text and password');
        return;
      }
      const encrypted = CryptoJS.AES.encrypt(text, password).toString();
      setEncryptedText(encrypted);
      setError('');
    } catch (err) {
      setError('Encryption failed. Please try again.');
    }
  };

  const decrypt = () => {
    try {
      if (!encryptedText || !password) {
        setError('Please enter both encrypted text and password');
        return;
      }
      const decrypted = CryptoJS.AES.decrypt(encryptedText, password);
      const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
      
      if (!decryptedString) {
        setError('Invalid password or corrupted text');
        return;
      }
      
      setDecryptedText(decryptedString);
      setError('');
    } catch (err) {
      setError('Decryption failed. Please check your password and encrypted text.');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const clearAll = () => {
    setText('');
    setPassword('');
    setEncryptedText('');
    setDecryptedText('');
    setError('');
  };

  return (
    <ToolLayout title="Note Encryption" description="Securely encrypt and decrypt your sensitive notes">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          {/* Original Text Input */}
          <div className="space-y-2">
            <Label>Text to Encrypt</Label>
            <Textarea
              placeholder="Enter text to encrypt..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label>Password</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter encryption password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={encrypt} className="flex-1">
              <Lock className="w-4 h-4 mr-2" />
              Encrypt
            </Button>
            <Button onClick={decrypt} className="flex-1">
              <Unlock className="w-4 h-4 mr-2" />
              Decrypt
            </Button>
            <Button variant="outline" onClick={clearAll}>
              Clear All
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950 rounded-md">
              {error}
            </div>
          )}

          {/* Encrypted Text Output */}
          {encryptedText && (
            <div className="space-y-2">
              <Label>Encrypted Text</Label>
              <div className="relative">
                <Textarea
                  value={encryptedText}
                  readOnly
                  className="pr-10 min-h-[100px]"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => copyToClipboard(encryptedText)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Decrypted Text Output */}
          {decryptedText && (
            <div className="space-y-2">
              <Label>Decrypted Text</Label>
              <div className="relative">
                <Textarea
                  value={decryptedText}
                  readOnly
                  className="pr-10 min-h-[100px]"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => copyToClipboard(decryptedText)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            <p className="font-medium">Security Tips:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Use a strong, unique password</li>
              <li>Don't share your password through the same channel as the encrypted text</li>
              <li>Clear all data after you're done</li>
              <li>The encryption uses AES (Advanced Encryption Standard)</li>
            </ul>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default NoteEncryption; 
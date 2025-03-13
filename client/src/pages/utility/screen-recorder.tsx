import React, { useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';
import { Video, Mic, StopCircle, Download, Play } from 'lucide-react';

const ScreenRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [includeAudio, setIncludeAudio] = useState(true);
  const [error, setError] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const startRecording = async () => {
    try {
      const displayMediaOptions = {
        video: {
          cursor: "always"
        },
        audio: includeAudio
      };

      // Get screen stream
      const screenStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      
      // Get audio stream if needed
      let combinedStream = screenStream;
      if (includeAudio) {
        try {
          const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const tracks = [...screenStream.getTracks(), ...audioStream.getTracks()];
          combinedStream = new MediaStream(tracks);
        } catch (err) {
          console.warn('Could not get audio stream:', err);
        }
      }

      streamRef.current = combinedStream;

      const mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType: 'video/webm;codecs=vp9'
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data]);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, {
          type: 'video/webm'
        });
        const url = URL.createObjectURL(blob);
        setRecordedVideo(url);
        streamRef.current?.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(1000);
      setIsRecording(true);
      setError('');

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (err) {
      setError('Failed to start recording. Please ensure you have granted the necessary permissions.');
      console.error('Error starting recording:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setRecordingTime(0);
    }
  };

  const downloadRecording = () => {
    if (recordedChunks.length === 0) return;

    const blob = new Blob(recordedChunks, {
      type: 'video/webm'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = `screen-recording-${new Date().toISOString()}.webm`;
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ToolLayout title="Screen Recorder" description="Record your screen with audio">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          {/* Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={includeAudio}
                  onCheckedChange={setIncludeAudio}
                  disabled={isRecording}
                />
                <Label>Include Audio</Label>
              </div>
              {isRecording && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-sm font-medium">{formatTime(recordingTime)}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {!isRecording ? (
                <Button onClick={startRecording} className="flex-1">
                  <Video className="w-4 h-4 mr-2" />
                  Start Recording
                </Button>
              ) : (
                <Button onClick={stopRecording} variant="destructive" className="flex-1">
                  <StopCircle className="w-4 h-4 mr-2" />
                  Stop Recording
                </Button>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950 rounded-md">
              {error}
            </div>
          )}

          {/* Preview */}
          {recordedVideo && (
            <div className="space-y-4">
              <Label>Recording Preview</Label>
              <video
                src={recordedVideo}
                controls
                className="w-full rounded-lg"
              />
              <Button onClick={downloadRecording} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Recording
              </Button>
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            <p className="font-medium">Tips:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Choose what to share when prompted (entire screen, window, or tab)</li>
              <li>Enable audio recording if you want to include system or microphone sound</li>
              <li>Recordings are saved in WebM format</li>
              <li>Make sure to grant necessary permissions when prompted</li>
            </ul>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default ScreenRecorder; 
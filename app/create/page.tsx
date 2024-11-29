'use client';

import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

interface SummaryResponse {
  summary?: string;
  error?: string;
}

const Page = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [voiceType, setVoiceType] = useState('female'); // Default voice type
  const [isPlaying, setIsPlaying] = useState(false); // To track play state
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null); // Ref for utterance

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to summarize');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data: SummaryResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get summary');
      }

      if (data.summary) {
        setSummary(data.summary);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate summary. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAudio = () => {
    if (!summary || isPlaying) return;

    const synth = window.speechSynthesis;

    // Stop any ongoing speech to ensure it doesn't repeat
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(summary);

    // Select voice based on user choice
    const voices = synth.getVoices();
    const selectedVoice = voices.find((voice) =>
      voiceType === 'male' ? voice.name.toLowerCase().includes('male') : voice.name.toLowerCase().includes('female')
    );

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Attach event listeners to manage state
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);

    synthRef.current = utterance; // Save reference for pause/resume
    synth.speak(utterance);
  };

  const handlePauseAudio = () => {
    const synth = window.speechSynthesis;
    if (synth.speaking && !synth.paused) {
      synth.pause();
    }
  };

  const handleResumeAudio = () => {
    const synth = window.speechSynthesis;
    if (synth.paused) {
      synth.resume();
    }
  };

  return (
    <div className="p-10 mt-20 max-w-4xl mx-auto">
      <Card className="bg-slate-950 text-white">
        <CardHeader>
          <CardTitle>Text Summarizer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Paste your text here:</label>
            <Textarea
              rows={8}
              className="w-full bg-slate-900 border-slate-700 resize-none"
              placeholder="Enter the text you want to summarize..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button onClick={handleSummarize} disabled={loading || !inputText.trim()} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Summarizing...
              </>
            ) : (
              'Summarize'
            )}
          </Button>

          {summary && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Summary:</label>
                <div className="p-4 bg-slate-900 rounded-md">{summary}</div>
              </div>

              <div className="flex items-center gap-4">
                <label className="block text-sm font-medium">Select Voice:</label>
                <select
                  value={voiceType}
                  onChange={(e) => setVoiceType(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-white p-2 rounded"
                >
                  <option value="female">Female Voice</option>
                  <option value="male">Male Voice</option>
                </select>
              </div>

              <div className="flex gap-4">
                <Button onClick={handlePlayAudio} disabled={isPlaying} className="w-full">
                  Play
                </Button>
                <Button onClick={handlePauseAudio} className="w-full">
                  Pause
                </Button>
                <Button onClick={handleResumeAudio} className="w-full">
                  Resume
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;

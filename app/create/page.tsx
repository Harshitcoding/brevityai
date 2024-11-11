'use client'

import React, { useState } from 'react';
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

  return (
    <div className="p-10 mt-20 max-w-4xl mx-auto">
      <Card className="bg-slate-950 text-white">
        <CardHeader>
          <CardTitle>Text Summarizer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Paste your text here:
            </label>
            <Textarea
              rows={8}
              className="w-full bg-slate-900 border-slate-700 resize-none"
              placeholder="Enter the text you want to summarize..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <Button
            onClick={handleSummarize}
            disabled={loading || !inputText.trim()}
            className="w-full"
          >
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
            <div className="space-y-2">
              <label className="block text-sm font-medium">Summary:</label>
              <div className="p-4 bg-slate-900 rounded-md">
                {summary}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
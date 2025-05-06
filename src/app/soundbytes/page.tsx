'use client';

import { useState, useRef } from 'react';
import { IconMicrophone, IconPlayerStop, IconPlayerPlay, IconPhotoPlus, IconShare, IconDiamond } from '@tabler/icons-react';

export default function SoundbytesPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [generatedArtUrl, setGeneratedArtUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('Click the microphone to start recording your SoundBYTE.');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleStartRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstart = () => {
          setIsRecording(true);
          setAudioBlob(null);
          setAudioUrl(null);
          setGeneratedArtUrl(null);
          setStatusMessage('Recording... Click stop when ready.');
        };

        mediaRecorderRef.current.onstop = () => {
          const completeAudioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          setAudioBlob(completeAudioBlob);
          const url = URL.createObjectURL(completeAudioBlob);
          setAudioUrl(url);
          setIsRecording(false);
          setStatusMessage('Recording finished. You can now play it back or generate your SoundBYTE art.');
          // Clean up the stream tracks
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorderRef.current.onerror = (event) => {
          console.error('MediaRecorder error:', event);
          setStatusMessage('Error during recording. Please try again.');
          setIsRecording(false);
        };
        
        mediaRecorderRef.current.start();
      } catch (err) {
        console.error('Error accessing microphone:', err);
        setStatusMessage('Could not access microphone. Please check permissions and try again.');
      }
    } else {
      setStatusMessage('Audio recording is not supported by your browser.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleGenerateArt = () => {
    if (!audioBlob) {
      setStatusMessage('Please record audio first before generating art.');
      return;
    }
    // Simulate art generation
    // In a real app, this would involve sending audio data to an AI service
    // and receiving an image URL or data.
    const artText = `SoundBYTE Art (from ${Math.round(audioBlob.size / 1024)}KB audio)`;
    setGeneratedArtUrl(`https://via.placeholder.com/500x300.png?text=${encodeURIComponent(artText)}`);
    setStatusMessage('Your SoundBYTE art has been generated!');
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary">SoundBYTEs</h1>
        <p className="text-xl mt-2 text-neutral-content">Transform your voice and emotions into unique visual art.</p>
      </header>

      <section className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl mb-4">Record Your SoundBYTE</h2>
          <p className="mb-4 min-h-[40px]">{statusMessage}</p>
          
          <div className="join mb-4">
            {!isRecording ? (
              <button 
                className="btn btn-lg btn-primary join-item tooltip" 
                data-tip="Start Recording"
                onClick={handleStartRecording}
                disabled={isRecording}
              >
                <IconMicrophone size={28} /> Start Recording
              </button>
            ) : (
              <button 
                className="btn btn-lg btn-error join-item tooltip" 
                data-tip="Stop Recording"
                onClick={handleStopRecording}
                disabled={!isRecording}
              >
                <IconPlayerStop size={28} /> Stop Recording
              </button>
            )}
          </div>

          {audioUrl && (
            <div className="mt-4 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-2">Listen to your recording:</h3>
              <audio controls src={audioUrl} className="w-full">
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      </section>

      {audioBlob && !generatedArtUrl && (
        <section className="text-center mb-8">
          <button 
            className="btn btn-secondary btn-lg"
            onClick={handleGenerateArt}
            disabled={isRecording || !audioBlob}
          >
            <IconPhotoPlus size={24} className="mr-2" /> Transform to SoundBYTE Art
          </button>
        </section>
      )}

      {generatedArtUrl && (
        <section className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl mb-4">Your Generated SoundBYTE Art</h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={generatedArtUrl} 
              alt="Generated SoundBYTE Art" 
              className="rounded-lg shadow-md max-w-full h-auto mb-4"
            />
            <div className="card-actions justify-center join">
              <button className="btn btn-accent join-item tooltip" data-tip="Share and earn $BaiBai (soon!)">
                <IconShare size={20} className="mr-1" /> Share SoundBYTE
              </button>
              <button className="btn btn-info join-item tooltip" data-tip="Mint as NFT (soon!)">
                <IconDiamond size={20} className="mr-1" /> Mint as NFT
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
} 
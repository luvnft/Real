'use client'
import React, { useState, useEffect } from 'react';
import Vapi from "@vapi-ai/web";
import { Button } from '@/components/ui/button';

const VapiChat = () => {
  const [vapi, setVapi] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Initialize Vapi
    const vapiInstance = new Vapi("67b304bb-8cc0-4f4a-91fd-ebd0538e00d8");
    setVapi(vapiInstance);

    // Set up event listeners
    vapiInstance.on("call-start", () => {
      console.log("Call has started.");
      setIsCallActive(true);
    });

    vapiInstance.on("call-end", () => {
      console.log("Call has ended.");
      setIsCallActive(false);
    });

    vapiInstance.on("message", (msg) => {
      console.log("Received message:", msg);
      setMessage(JSON.stringify(msg, null, 2));
    });

    vapiInstance.on("error", (e) => {
      console.error("Error:", e);
    });

    // Clean up
    return () => {
      if (vapiInstance) {
        vapiInstance.stop();
      }
    };
  }, []);

  const startCall = () => {
    if (vapi) {
      vapi.start({
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
        },
        model: {
          provider: "openai",
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant for assitanting user to find any good restaurent in new york city.",
            },
          ],
        },
        voice: {
          provider: "playht",
          voiceId: "jennifer",
        },
        name: "Vapi Demo Assistant",
      });
    }
  };

  const stopCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vapi AI Chat</h1>
      <div className="space-x-2 mb-4">
        <Button onClick={startCall} disabled={isCallActive}>Start Call</Button>
        <Button onClick={stopCall} disabled={!isCallActive}>End Call</Button>
      </div>
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-semibold mb-2">Last Message:</h2>
        <pre className="whitespace-pre-wrap">{message}</pre>
      </div>
    </div>
  );
};

export default VapiChat;
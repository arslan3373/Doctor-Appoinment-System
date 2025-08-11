import React, { useState, useEffect } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  MessageSquare, 
  Users,
  Settings,
  Monitor,
  Camera
} from 'lucide-react';

interface VideoCallProps {
  doctorName: string;
  doctorImage: string;
  onEndCall: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ doctorName, doctorImage, onEndCall }) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'doctor', text: 'Hello! How are you feeling today?' },
    { id: 2, sender: 'patient', text: 'Hi doctor, I\'ve been having some headaches lately.' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'patient',
        text: newMessage
      }]);
      setNewMessage('');
    }
  };

  return (
    <div className="h-screen bg-gray-900 relative overflow-hidden">
      {/* Main Video Area */}
      <div className="relative h-full">
        {/* Doctor's Video (Main) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <img
                src={doctorImage}
                alt={doctorName}
                className="w-64 h-64 rounded-full mx-auto mb-6 border-4 border-white shadow-2xl"
              />
              <h2 className="text-3xl font-bold text-white mb-2">{doctorName}</h2>
              <p className="text-blue-200 text-lg">Online Consultation</p>
            </div>
          </div>
        </div>

        {/* Patient's Video (Picture-in-Picture) */}
        <div className="absolute top-6 right-6 w-64 h-48 bg-gray-800 rounded-lg border-2 border-gray-600 overflow-hidden shadow-xl">
          <div className="h-full flex items-center justify-center">
            {isVideoOn ? (
              <div className="text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Your Camera</p>
              </div>
            ) : (
              <div className="text-center">
                <VideoOff className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Camera Off</p>
              </div>
            )}
          </div>
        </div>

        {/* Call Duration */}
        <div className="absolute top-6 left-6 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="font-mono text-lg">{formatTime(callDuration)}</span>
          </div>
        </div>

        {/* Control Panel */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-sm p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-6">
              {/* Audio Toggle */}
              <button
                onClick={() => setIsAudioOn(!isAudioOn)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isAudioOn 
                    ? 'bg-gray-600 hover:bg-gray-500' 
                    : 'bg-red-600 hover:bg-red-500'
                }`}
              >
                {isAudioOn ? (
                  <Mic className="w-6 h-6 text-white" />
                ) : (
                  <MicOff className="w-6 h-6 text-white" />
                )}
              </button>

              {/* Video Toggle */}
              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isVideoOn 
                    ? 'bg-gray-600 hover:bg-gray-500' 
                    : 'bg-red-600 hover:bg-red-500'
                }`}
              >
                {isVideoOn ? (
                  <Video className="w-6 h-6 text-white" />
                ) : (
                  <VideoOff className="w-6 h-6 text-white" />
                )}
              </button>

              {/* End Call */}
              <button
                onClick={onEndCall}
                className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center transition-all transform hover:scale-105"
              >
                <PhoneOff className="w-7 h-7 text-white" />
              </button>

              {/* Chat Toggle */}
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="w-14 h-14 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center transition-all"
              >
                <MessageSquare className="w-6 h-6 text-white" />
              </button>

              {/* Settings */}
              <button className="w-14 h-14 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center transition-all">
                <Settings className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      {isChatOpen && (
        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl z-50">
          <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
              <h3 className="font-semibold">Chat</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'patient'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import SimplePeer from 'simple-peer';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  MessageSquare,
  Settings,
  Users,
  Monitor
} from 'lucide-react';

interface VideoCallRoomProps {
  roomId: string;
  userId: string;
  userName: string;
  onEndCall: () => void;
}

const VideoCallRoom: React.FC<VideoCallRoomProps> = ({ 
  roomId, 
  userId, 
  userName, 
  onEndCall 
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [messages, setMessages] = useState<Array<{id: string, sender: string, text: string}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    // Get user media
    navigator.mediaDevices.getUserMedia({ 
      video: true, 
      audio: true 
    }).then((mediaStream) => {
      setStream(mediaStream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }
    }).catch((error) => {
      console.error('Error accessing media devices:', error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && stream) {
      socket.emit('join-room', roomId, userId);

      socket.on('user-connected', (connectedUserId: string) => {
        console.log('User connected:', connectedUserId);
        // Create peer connection as initiator
        const newPeer = new SimplePeer({
          initiator: true,
          trickle: false,
          stream: stream
        });

        newPeer.on('signal', (data) => {
          socket.emit('offer', roomId, data);
        });

        newPeer.on('stream', (remoteStream) => {
          setRemoteStream(remoteStream);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
          setIsConnected(true);
        });

        setPeer(newPeer);
      });

      socket.on('offer', (offer) => {
        console.log('Received offer');
        // Create peer connection as receiver
        const newPeer = new SimplePeer({
          initiator: false,
          trickle: false,
          stream: stream
        });

        newPeer.on('signal', (data) => {
          socket.emit('answer', roomId, data);
        });

        newPeer.on('stream', (remoteStream) => {
          setRemoteStream(remoteStream);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
          setIsConnected(true);
        });

        newPeer.signal(offer);
        setPeer(newPeer);
      });

      socket.on('answer', (answer) => {
        console.log('Received answer');
        if (peer) {
          peer.signal(answer);
        }
      });

      socket.on('call-ended', () => {
        onEndCall();
      });
    }
  }, [socket, stream, roomId, userId, peer, onEndCall]);

  useEffect(() => {
    if (isConnected) {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isConnected]);

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(audioTrack.enabled);
      }
    }
  };

  const endCall = () => {
    if (socket) {
      socket.emit('end-call', roomId);
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (peer) {
      peer.destroy();
    }
    onEndCall();
  };

  const sendMessage = () => {
    if (newMessage.trim() && socket) {
      const message = {
        id: Date.now().toString(),
        sender: userName,
        text: newMessage
      };
      setMessages(prev => [...prev, message]);
      socket.emit('chat-message', roomId, message);
      setNewMessage('');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen bg-gray-900 relative overflow-hidden">
      {/* Main Video Area */}
      <div className="relative h-full">
        {/* Remote Video (Main) */}
        <div className="absolute inset-0">
          {remoteStream ? (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-900 to-blue-700">
              <div className="text-center text-white">
                <Users className="w-24 h-24 mx-auto mb-4 opacity-50" />
                <h2 className="text-2xl font-bold mb-2">Waiting for participant...</h2>
                <p className="text-blue-200">Room ID: {roomId}</p>
              </div>
            </div>
          )}
        </div>

        {/* Local Video (Picture-in-Picture) */}
        <div className="absolute top-6 right-6 w-64 h-48 bg-gray-800 rounded-lg border-2 border-gray-600 overflow-hidden shadow-xl">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {!isVideoOn && (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <VideoOff className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>

        {/* Call Duration */}
        <div className="absolute top-6 left-6 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="font-mono text-lg">{formatTime(callDuration)}</span>
          </div>
        </div>

        {/* Connection Status */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <span className="text-sm">{isConnected ? 'Connected' : 'Connecting...'}</span>
          </div>
        </div>

        {/* Control Panel */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-sm p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-6">
              {/* Audio Toggle */}
              <button
                onClick={toggleAudio}
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
                onClick={toggleVideo}
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
                onClick={endCall}
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

              {/* Screen Share */}
              <button className="w-14 h-14 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center transition-all">
                <Monitor className="w-6 h-6 text-white" />
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
                className="text-white hover:text-gray-200 text-xl"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === userName ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === userName
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-xs font-medium mb-1">{message.sender}</p>
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

export default VideoCallRoom;
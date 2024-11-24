import { useEffect, useState, useCallback, useRef } from 'react';

interface UseWebSocketResult {
    messages: string[];
    sendMessage: (message: string) => void;
    isConnected: boolean;
    reconnect: () => void;
}

const useWebSocket = (url: string): UseWebSocketResult => {
    const [messages, setMessages] = useState<string[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef<WebSocket | null>(null);

    const connect = useCallback(() => {
        const socket = new WebSocket(url);
        socketRef.current = socket;

        socket.onopen = () => {
            setIsConnected(true);
            console.log('Connected to WebSocket server');
        };

        socket.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            setIsConnected(false);
            console.log('WebSocket connection closed');
        };
    }, [url]);

    // Initialize WebSocket connection
    useEffect(() => {
        connect();
        return () => {
            socketRef.current?.close();
        };
    }, [connect]);

    // Function to send messages
    const sendMessage = useCallback((message: string) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(message);
        } else {
            console.error('WebSocket is not open');
        }
    }, []);

    // Function to reconnect
    const reconnect = useCallback(() => {
        if (!isConnected && (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED)) {
            console.log('Attempting to reconnect...');
            connect();
        }
    }, [connect, isConnected]);

    return { messages, sendMessage, isConnected, reconnect };
};

export default useWebSocket;

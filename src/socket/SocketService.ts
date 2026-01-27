import { io, Socket } from 'socket.io-client';

interface SocketConfig {
  url: string;
  userId: string;
  role: string;
  token?: string;
}

class SocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, Function[]> = new Map();
  private config: SocketConfig | null = null;

  connect(config: SocketConfig) {
    if (this.socket?.connected) {
      console.log('Socket already connected');
      return;
    }

    this.config = config;

    this.socket = io(config.url, {
      query: {
        user_id: config.userId,
        role: config.role,
      },
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      // Optional: Add auth token if needed
      ...(config.token && {
        auth: {
          token: config.token,
        },
      }),
    });

    this.setupDefaultListeners();
  }

  private setupDefaultListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('✅ Socket connected:', this.socket?.id);
      console.log('📡 Connected to namespace/room');
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
      
      // Auto-reconnect on certain disconnect reasons
      if (reason === 'io server disconnect') {
        // Server disconnected, manually reconnect
        this.socket?.connect();
      }
    });

    this.socket.on('connect_error', (error) => {
      console.log('🔴 Socket connection error:', error.message);
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log('🔄 Socket reconnected after', attemptNumber, 'attempts');
    });

    this.socket.on('reconnect_attempt', (attemptNumber) => {
      console.log('🔄 Attempting to reconnect...', attemptNumber);
    });

    this.socket.on('reconnect_error', (error) => {
      console.log('🔴 Reconnection error:', error.message);
    });

    this.socket.on('reconnect_failed', () => {
      console.log('❌ Reconnection failed after all attempts');
    });
  }

  on(event: string, callback: Function) {
    if (!this.socket) {
      console.warn('Socket not initialized');
      return;
    }

    this.socket.on(event, callback as any);
    
    // Store listener for cleanup
    const eventListeners = this.listeners.get(event) || [];
    eventListeners.push(callback);
    this.listeners.set(event, eventListeners);
  }

  off(event: string, callback?: Function) {
    if (!this.socket) return;

    if (callback) {
      this.socket.off(event, callback as any);
    } else {
      this.socket.off(event);
    }

    // Clean up stored listeners
    if (callback) {
      const eventListeners = this.listeners.get(event) || [];
      const filtered = eventListeners.filter(cb => cb !== callback);
      this.listeners.set(event, filtered);
    } else {
      this.listeners.delete(event);
    }
  }

  emit(event: string, data?: any) {
    if (!this.socket?.connected) {
      console.warn('Socket not connected. Cannot emit:', event);
      return;
    }
    console.log('📤 Emitting event:', event, data);
    this.socket.emit(event, data);
  }

  disconnect() {
    if (this.socket) {
      // Remove all listeners
      this.listeners.forEach((_, event) => {
        this.socket?.off(event);
      });
      this.listeners.clear();

      this.socket.disconnect();
      this.socket = null;
      this.config = null;
      console.log('Socket disconnected manually');
    }
  }

  reconnect() {
    if (this.config) {
      console.log('🔄 Manual reconnection...');
      this.disconnect();
      this.connect(this.config);
    }
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getSocketId(): string | undefined {
    return this.socket?.id;
  }

  getConfig(): SocketConfig | null {
    return this.config;
  }
}

export default new SocketService();
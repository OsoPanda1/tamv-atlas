// ============================================================================
// TAMV MD-X4™ - Custom Hooks for System Integration
// React hooks for accessing all TAMV systems (Optimized Edition)
// ============================================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTAMVStore } from '@/stores/tamvStore';
import { getKAOSInstance, type AudioEnvironment, type BinauralPreset, type NotificationType } from '@/systems/KAOSAudioSystem';
import { anubis, type SecurityEvent, type SecurityMetrics } from '@/systems/AnubisSecuritySystem';
import { university, type Course, type Enrollment, type Certificate } from '@/systems/UniversitySystem';
import { economy, type Wallet, type Transaction, type LotteryDraw, type MembershipTier } from '@/systems/EconomySystem';

// ============================================================================
// KAOS Audio Hook
// ============================================================================

export function useKAOSAudio() {
  const kaos = getKAOSInstance();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [config, setConfig] = useState(() => kaos.getConfig());

  useEffect(() => {
    let isMounted = true;
    
    const init = async () => {
      try {
        const success = await kaos.initialize();
        if (isMounted) {
          setIsInitialized(success);
          setConfig(kaos.getConfig());
        }
      } catch (error) {
        console.error('[KAOS Audio] Initialization failed:', error);
      }
    };
    
    init();
    return () => { isMounted = false; };
  }, [kaos]);

  const playBinaural = useCallback(async (preset: BinauralPreset, duration?: number) => {
    await kaos.playBinauralPreset(preset, duration);
  }, [kaos]);

  const playNotification = useCallback(async (type: NotificationType, position?: { x: number; y: number; z: number }) => {
    await kaos.playNotification(type, position);
  }, [kaos]);

  const playEnvironment = useCallback(async (environment: AudioEnvironment, duration?: number) => {
    await kaos.playEnvironment(environment, duration);
  }, [kaos]);

  const stopBinaural = useCallback(() => {
    kaos.stopBinaural();
  }, [kaos]);

  const stopEnvironment = useCallback(() => {
    kaos.stopEnvironment();
  }, [kaos]);

  const setVolume = useCallback((volume: number) => {
    kaos.setMasterVolume(volume);
    setConfig(kaos.getConfig());
  }, [kaos]);

  const setListenerPosition = useCallback((x: number, y: number, z: number) => {
    kaos.setListenerPosition(x, y, z);
  }, [kaos]);

  return {
    isInitialized,
    config,
    playBinaural,
    playNotification,
    playEnvironment,
    stopBinaural,
    stopEnvironment,
    setVolume,
    setListenerPosition,
  };
}

// ============================================================================
// Anubis Security Hook
// ============================================================================

export function useAnubisSecurity() {
  const [metrics, setMetrics] = useState<SecurityMetrics>(() => anubis.getMetrics());
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [isMonitoring, setIsMonitoring] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    if (!isMonitoring) return;

    const updateSecurityData = () => {
      if (!isMounted) return;
      setMetrics(anubis.getMetrics());
      setEvents(anubis.getRecentEvents(20));
    };

    updateSecurityData(); // Primera carga inmediata
    const interval = setInterval(updateSecurityData, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [isMonitoring]);

  const runScan = useCallback(async () => {
    const scanEvents = await anubis.runSecurityScan();
    setEvents(anubis.getRecentEvents(20));
    setMetrics(anubis.getMetrics());
    return scanEvents;
  }, []);

  const blockThreat = useCallback(async (eventId: string) => {
    const success = await anubis.blockThreat(eventId);
    setMetrics(anubis.getMetrics());
    setEvents(anubis.getRecentEvents(20));
    return success;
  }, []);

  const healThreat = useCallback(async (eventId: string) => {
    const success = await anubis.initiateSelfHealing(eventId);
    setMetrics(anubis.getMetrics());
    setEvents(anubis.getRecentEvents(20));
    return success;
  }, []);

  const getReport = useCallback(() => {
    return anubis.generateReport();
  }, []);

  return {
    metrics,
    events,
    isMonitoring,
    setIsMonitoring,
    runScan,
    blockThreat,
    healThreat,
    getReport,
  };
}

// ============================================================================
// University Hook
// ============================================================================

export function useUniversity() {
  const user = useTAMVStore(state => state.user);
  const userId = user?.id; // Primitivo para estabilizar dependencias de useEffect
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [statistics, setStatistics] = useState(() => university.getStatistics());

  const syncUniversityData = useCallback(() => {
    setCourses(university.getAllCourses());
    setStatistics(university.getStatistics());
    if (userId) {
      setEnrollments(university.getUserEnrollments(userId));
    } else {
      setEnrollments([]);
    }
  }, [userId]);

  useEffect(() => {
    syncUniversityData();
  }, [syncUniversityData]);

  const enroll = useCallback((courseId: string) => {
    if (!userId) return null;
    const enrollment = university.enrollUser(userId, courseId);
    syncUniversityData();
    return enrollment;
  }, [userId, syncUniversityData]);

  const updateProgress = useCallback((courseId: string, lessonId: string) => {
    if (!userId) return null;
    const enrollment = university.updateLessonProgress(userId, courseId, lessonId);
    syncUniversityData();
    return enrollment;
  }, [userId, syncUniversityData]);

  const completeCourse = useCallback(async (courseId: string) => {
    if (!userId) return null;
    const certificate = await university.completeCourse(userId, courseId);
    syncUniversityData();
    return certificate;
  }, [userId, syncUniversityData]);

  const searchCourses = useCallback((query: string) => {
    return university.searchCourses(query);
  }, []);

  const getCourse = useCallback((courseId: string) => {
    return university.getCourse(courseId);
  }, []);

  return {
    courses,
    enrollments,
    statistics,
    enroll,
    updateProgress,
    completeCourse,
    searchCourses,
    getCourse,
    refreshData: syncUniversityData
  };
}

// ============================================================================
// Economy Hook
// ============================================================================

export function useEconomy() {
  const user = useTAMVStore(state => state.user);
  const userId = user?.id;

  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [lotteryDraws, setLotteryDraws] = useState<LotteryDraw[]>([]);
  const [fenixFund, setFenixFund] = useState(() => economy.getFenixFund());
  const [statistics, setStatistics] = useState(() => economy.getStatistics());

  const refreshWallet = useCallback(() => {
    if (userId) {
      setWallet(economy.getWallet(userId));
      setTransactions(economy.getUserTransactions(userId));
    } else {
      setWallet(null);
      setTransactions([]);
    }
    setLotteryDraws(economy.getActiveDraws());
    setFenixFund(economy.getFenixFund());
    setStatistics(economy.getStatistics());
  }, [userId]);

  useEffect(() => {
    refreshWallet();
  }, [refreshWallet]);

  const transferCredits = useCallback((toUserId: string, amount: number, description: string) => {
    if (!userId) return null;
    const tx = economy.transferCredits(userId, toUserId, amount, description);
    refreshWallet();
    return tx;
  }, [userId, refreshWallet]);

  const purchaseTickets = useCallback((drawId: string, quantity: number) => {
    if (!userId) return null;
    const result = economy.purchaseTickets(userId, drawId, quantity);
    refreshWallet();
    return result;
  }, [userId, refreshWallet]);

  const upgradeMembership = useCallback((tier: MembershipTier) => {
    if (!userId) return null;
    const updatedWallet = economy.upgradeMembership(userId, tier);
    refreshWallet();
    return updatedWallet;
  }, [userId, refreshWallet]);

  const getCommissionRate = useCallback(() => {
    if (!userId) return 0.30;
    return economy.getCommissionRate(userId);
  }, [userId]);

  return {
    wallet,
    transactions,
    lotteryDraws,
    fenixFund,
    statistics,
    refreshWallet,
    transferCredits,
    purchaseTickets,
    upgradeMembership,
    getCommissionRate,
  };
}

// ============================================================================
// Quantum State Hook
// ============================================================================

export function useQuantumState() {
  const store = useTAMVStore();
  
  const coherence = store.quantumCoherence;
  const user = store.user;
  const sensorPermissions = store.sensorPermissions;
  const activeDreamSpace = store.activeDreamSpace;
  const isAuthenticated = store.isAuthenticated;

  const updateCoherence = useCallback((delta: number) => {
    store.updateCoherence(delta);
  }, [store]);

  const setSensorPermission = useCallback((sensor: keyof typeof sensorPermissions, granted: boolean) => {
    store.setSensorPermission(sensor, granted);
  }, [store]);

  const activateDreamSpace = useCallback((spaceId: string) => {
    store.setActiveDreamSpace({ id: spaceId } as any);
  }, [store]);

  const deactivateDreamSpace = useCallback(() => {
    store.setActiveDreamSpace(null);
  }, [store]);

  const login = useCallback((userData: any) => {
    store.setUser(userData);
  }, [store]);

  const logout = useCallback(() => {
    store.logout();
  }, [store]);

  return {
    coherence,
    user,
    sensorPermissions,
    activeDreamSpace,
    updateCoherence,
    setSensorPermission,
    activateDreamSpace,
    deactivateDreamSpace,
    isAuthenticated,
    login,
    logout,
  };
}

// ============================================================================
// Notifications Hook
// ============================================================================

export function useNotifications() {
  const notifications = useTAMVStore(state => state.notifications);
  const unreadCount = useTAMVStore(state => state.unreadCount);
  const addNotification = useTAMVStore(state => state.addNotification);
  const markRead = useTAMVStore(state => state.markNotificationRead);
  const clearAll = useTAMVStore(state => state.clearNotifications);

  const notify = useCallback((
    type: 'info' | 'success' | 'warning' | 'error' | 'social' | 'achievement', 
    title: string, 
    message: string, 
    actionUrl?: string
  ) => {
    addNotification({ type, title, message, actionUrl });
  }, [addNotification]);

  return {
    notifications,
    unreadCount,
    notify,
    markRead,
    clearAll,
  };
}

// ============================================================================
// WebSocket Hook (With Resilient Reconnection Engine)
// ============================================================================

export function useWebSocket(url?: string) {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef<number>(0);
  const maxReconnectInterval = 30000; // Máximo 30 segundos entre intentos

  useEffect(() => {
    const wsUrl = url || import.meta.env.VITE_SUPABASE_URL?.replace('https', 'wss') + '/websocket';
    if (!wsUrl) return;

    let connectTimeout: NodeJS.Timeout;

    const connect = () => {
      try {
        console.log(`[WebSocket] Connecting to ${wsUrl}...`);
        wsRef.current = new WebSocket(wsUrl);

        wsRef.current.onopen = () => {
          setIsConnected(true);
          reconnectAttempts.current = 0;
          console.log('[WebSocket] Connection established with Core Infrastructure.');
        };

        wsRef.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            setLastMessage(data);
          } catch {
            setLastMessage(event.data);
          }
        };

        wsRef.current.onclose = (event) => {
          setIsConnected(false);
          console.warn(`[WebSocket] Connection closed. Code: ${event.code}. Attempting recovery...`);
          
          // Cálculo de reconexión exponencial
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), maxReconnectInterval);
          reconnectAttempts.current += 1;
          
          connectTimeout = setTimeout(() => {
            connect();
          }, delay);
        };

        wsRef.current.onerror = (error) => {
          console.error('[WebSocket] Channel Error:', error);
        };
      } catch (error) {
        console.error('[WebSocket] Initialization failed:', error);
      }
    };

    connect();

    return () => {
      clearTimeout(connectTimeout);
      if (wsRef.current) {
        wsRef.current.onclose = null; // Evita el trigger de reconexión al desmontar
        wsRef.current.close();
      }
    };
  }, [url]);

  const send = useCallback((data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    } else {
      console.error('[WebSocket] Cannot send payload. Connection state is not OPEN.');
    }
  }, []);

  return {
    isConnected,
    lastMessage,
    send,
  };
}

// ============================================================================
// Unified Export
// ============================================================================

export default {
  useKAOSAudio,
  useAnubisSecurity,
  useUniversity,
  useEconomy,
  useQuantumState,
  useNotifications,
  useWebSocket,
};

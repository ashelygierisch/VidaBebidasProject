'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { signOut, getSession } from '../../lib/signup'
import OneSignal from 'react-onesignal';
import { toast } from 'react-hot-toast';

interface Booking {
  id: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  serviceType: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  venueName?: string;
  venueType?: string;
  city?: string;
  address: string;
  guestCount?: number;
  barOption?: string;
  status: string;
  depositPaid: boolean;
  source?: string;
  message?: string;
  // Waiver fields
  confirmWaiver: boolean;
  electronicSignature?: string;
  waiverSignedAt?: string;
}

const BOOKING_STATUSES = ['PENDING', 'REQUESTED', 'CONFIRMED', 'COMPLETED', 'CANCELED'] as const;

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Dashboard = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [notifStatus, setNotifStatus] = useState<string>('Checking...')
  const [isSettingUp, setIsSettingUp] = useState(false)

  const [bookings, setBookings] = useState<Booking[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  // Month navigation state
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  // Fetch bookings function (extracted so it can be reused)
  const fetchBookings = async (showToast = false) => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/bookings', {
        cache: 'no-store', 
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setBookings(data);
        if (showToast) toast.success('Bookings refreshed!');
      } else {
        console.warn('API did not return an array:', data);
        if (showToast) toast.error('Failed to refresh');
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      if (showToast) toast.error('Failed to refresh');
    } finally {
      setIsRefreshing(false);
    }
  };
  useEffect(() => {
    const checkAuth = async () => {
      const { session, error } = await getSession()
      
      if (!session || error) {
        router.push('/admin')
        return
      }
      
      setIsAuthenticated(true)
      setIsLoading(false)

      // Wait for OneSignal to initialize
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Login to OneSignal with the user's ID - links ALL devices to this user
      try {
        await OneSignal.login(session.user.id);
      } catch (err) {
        console.error('OneSignal login error:', err);
      }

      // Check notification permission status
      try {
        const permission = await OneSignal.Notifications.permission;
        if (permission) {
          setNotifStatus('✅ Notifications enabled');
        } else {
          setNotifStatus('Tap button to enable notifications');
        }
      } catch (err) {
        setNotifStatus('Tap button to enable notifications');
      }
    }
    
    checkAuth()
    fetchBookings();
  }, [router])

  const setupPushNotifications = async () => {
    setIsSettingUp(true);
    
    // Detect iOS - must be opened from Home Screen for notifications to work
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         (window.navigator as any).standalone === true;
    
    if (isIOS && !isStandalone) {
      setNotifStatus('📱 Add to Home Screen first, then open from there');
      setIsSettingUp(false);
      return;
    }
    
    // Check if notifications are supported
    if (!('Notification' in window)) {
      setNotifStatus('❌ Notifications not supported on this device');
      setIsSettingUp(false);
      return;
    }
    
    try {
      // Request permission using native API (works better on iOS PWA)
      let permission = Notification.permission;
      
      if (permission === 'default') {
        setNotifStatus('Tap "Allow" on the popup...');
        permission = await Notification.requestPermission();
      }
      
      if (permission === 'granted') {
        setNotifStatus('Connecting to notification service...');
        
        // Login to OneSignal with user ID
        const { session } = await getSession();
        if (session?.user?.id) {
          await OneSignal.login(session.user.id);
        }
        
        // Trigger OneSignal subscription
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        try {
          await OneSignal.User.PushSubscription.optIn();
        } catch (e) {
          // optIn may fail if already opted in, that's okay
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const subscriptionId = OneSignal.User.PushSubscription.id;
        if (subscriptionId) {
          setNotifStatus('✅ Notifications enabled!');
        } else {
          setNotifStatus('✅ Notifications enabled! Syncing...');
        }
      } else if (permission === 'denied') {
        setNotifStatus('❌ Permission denied. Enable in Settings > Notifications');
      } else {
        setNotifStatus('Permission dismissed. Tap to try again.');
      }
    } catch (err) {
      console.error('Notification setup error:', err);
      setNotifStatus('❌ Setup failed. Please try again.');
    } finally {
      setIsSettingUp(false);
    }
  };

  const handleLogout = async () => {
    // Note: We intentionally do NOT call OneSignal.logout() here
    // so that Michael continues to receive booking notifications
    // even when logged out of the dashboard
    await signOut()
    router.push('/admin')
  }

  // Update booking status or other fields
  const updateBooking = async (bookingId: string, updates: Partial<Booking>) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: bookingId, ...updates }),
      });

      if (!res.ok) {
        throw new Error('Failed to update booking');
      }

      const updatedBooking = await res.json();

      // Update local state
      setBookings(prev => 
        prev.map(b => b.id === bookingId ? { ...b, ...updatedBooking } : b)
      );

      toast.success('Booking updated!');
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update booking');
    }
  };

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    updateBooking(bookingId, { status: newStatus });
  };

  const handleDepositToggle = (bookingId: string, currentValue: boolean) => {
    updateBooking(bookingId, { depositPaid: !currentValue });
  };

  // Month navigation
  const goToPrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedMonth(prev => prev - 1);
    }
  };

  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(prev => prev + 1);
    } else {
      setSelectedMonth(prev => prev + 1);
    }
  };

  const goToCurrentMonth = () => {
    setSelectedMonth(new Date().getMonth());
    setSelectedYear(new Date().getFullYear());
  };

  // Filter bookings for selected month
  const getBookingsForMonth = () => {
    return bookings.filter(booking => {
      const eventDate = new Date(booking.eventDate);
      return eventDate.getMonth() === selectedMonth && 
             eventDate.getFullYear() === selectedYear &&
             booking.status !== 'CANCELED';
    }).sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
  };

  const monthBookings = getBookingsForMonth();
  const isCurrentMonth = selectedMonth === new Date().getMonth() && selectedYear === new Date().getFullYear();

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null
  }


  return (
    <div className="mt-[100px] bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Image
                src="/VB-Logo-2026.png"
                alt="Vida Bebidas Logo"
                width={40}
                height={40}
              />
              <h1 className="text-xl font-bold text-foreground">Vida Bebidas Admin</h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Welcome, Michael!</h2>
          <p className="text-muted-foreground mt-1">Manage your bookings and events</p>
{/*         
        <div className="mt-6 p-4 bg-card border border-border rounded-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground">Push Notifications</h3>
              <p className="text-sm text-muted-foreground mt-1">{notifStatus}</p>
            </div>
            <button 
              onClick={setupPushNotifications}
              disabled={isSettingUp}
              className="w-full sm:w-auto px-6 py-4 bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 disabled:bg-yellow-500/50 text-black font-semibold rounded-lg text-base min-h-[48px] touch-manipulation transition-colors"
            >
              {isSettingUp ? '⏳ Setting up...' : '🔔 Enable Notifications'}
            </button>
          </div>
        </div>
        </div> */}
        {/* Stats Row */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg">
            <span className="text-sm text-muted-foreground">📅 Total</span>
            <span className="font-bold text-foreground">{bookings.length}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg">
            <span className="text-sm text-muted-foreground">✅ Confirmed</span>
            <span className="font-bold text-green-400">{bookings.filter(b => b.status === 'CONFIRMED').length}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg">
            <span className="text-sm text-muted-foreground">⏳ Pending</span>
            <span className="font-bold text-yellow-400">{bookings.filter(b => b.status === 'PENDING' || b.status === 'REQUESTED').length}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg">
            <span className="text-sm text-muted-foreground">🎉 Completed</span>
            <span className="font-bold text-blue-400">{bookings.filter(b => b.status === 'COMPLETED').length}</span>
          </div>
        </div>

        {/* Upcoming Events by Month */}
        <div className="mt-8 bg-card border border-border rounded-xl p-6 shadow-sm">
          {/* Month Navigation Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={goToPrevMonth}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <span className="text-xl">←</span>
            </button>
            
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground">
                {MONTH_NAMES[selectedMonth]} {selectedYear}
              </h3>
              <p className="text-sm text-muted-foreground">
                {monthBookings.length} event{monthBookings.length !== 1 ? 's' : ''} scheduled
              </p>
            </div>
            
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <span className="text-xl">→</span>
            </button>
          </div>

          {/* Jump to Today Button */}
          {!isCurrentMonth && (
            <div className="flex justify-center mb-4">
              <button
                onClick={goToCurrentMonth}
                className="px-4 py-2 text-sm bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors"
              >
                Jump to Current Month
              </button>
            </div>
          )}

          {/* Month Events List */}
          {monthBookings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-4xl mb-2">📭</p>
              <p>No events scheduled for {MONTH_NAMES[selectedMonth]}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {monthBookings.map((booking) => {
                const eventDate = new Date(booking.eventDate);
                const dayOfWeek = eventDate.toLocaleDateString('en-US', { weekday: 'short' });
                const dayNum = eventDate.getDate();
                
                return (
                  <div 
                    key={booking.id} 
                    className="flex items-center gap-4 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    {/* Date Badge */}
                    <div className="flex-shrink-0 w-14 h-14 bg-yellow-500/20 rounded-lg flex flex-col items-center justify-center">
                      <span className="text-xs text-yellow-400 font-medium">{dayOfWeek}</span>
                      <span className="text-xl font-bold text-yellow-400">{dayNum}</span>
                    </div>
                    
                    {/* Event Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate">{booking.clientName}</h4>
                      <p className="text-sm text-muted-foreground truncate">
                        {booking.venueName || booking.venueType} • {booking.city}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {booking.serviceType} • {booking.guestCount} guests
                      </p>
                    </div>
                    
                    {/* Status Badge */}
                    <span className={`flex-shrink-0 px-2 py-1 text-xs rounded-full font-medium ${
                      booking.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-400' :
                      booking.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                      booking.status === 'COMPLETED' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* All Bookings Table */}
        <div className="mt-8 bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">All Bookings ({bookings.length})</h3>
            <button
              onClick={() => fetchBookings(true)}
              disabled={isRefreshing}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors disabled:opacity-50"
              title="Refresh bookings"
            >
              <span className={`text-lg ${isRefreshing ? 'animate-spin' : ''}`}>🔄</span>
            </button>
          </div>
          {bookings.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No bookings yet</p>
              <p className="text-sm mt-1">Bookings will appear here once customers submit requests</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking: Booking) => (
                <div key={booking.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{booking.clientName}</h4>
                      <p className="text-sm text-muted-foreground">{booking.venueName || booking.venueType}</p>
                    </div>
                    {/* Status Dropdown */}
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                      className={`px-3 py-1 text-sm rounded-lg border-0 cursor-pointer font-medium ${
                        booking.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-400' :
                        booking.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                        booking.status === 'COMPLETED' ? 'bg-blue-500/20 text-blue-400' :
                        booking.status === 'CANCELED' ? 'bg-red-500/20 text-red-400' :
                        booking.status === 'REQUESTED' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {BOOKING_STATUSES.map(status => (
                        <option key={status} value={status} className="bg-gray-800 text-white">
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Booking Details */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <p><span className="text-muted-foreground">Date:</span> {new Date(booking.eventDate).toLocaleDateString()}</p>
                    <p><span className="text-muted-foreground">Package:</span> {booking.serviceType}</p>
                    <p><span className="text-muted-foreground">Guests:</span> {booking.guestCount}</p>
                    <p><span className="text-muted-foreground">City:</span> {booking.city}</p>
                    <p className="col-span-2"><span className="text-muted-foreground">Address:</span> {booking.address}</p>
                    {booking.clientPhone && (
                      <p><span className="text-muted-foreground">Phone:</span> <a href={`tel:${booking.clientPhone}`} className="text-blue-400 hover:underline">{booking.clientPhone}</a></p>
                    )}
                    {booking.clientEmail && (
                      <p><span className="text-muted-foreground">Email:</span> <a href={`mailto:${booking.clientEmail}`} className="text-blue-400 hover:underline">{booking.clientEmail}</a></p>
                    )}
                  </div>

                  {/* Deposit & Waiver Section */}
                  <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-4">
                    {/* Deposit Toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Deposit</span>
                      <button
                        onClick={() => handleDepositToggle(booking.id, booking.depositPaid)}
                        className={`px-3 py-1 text-sm rounded-lg font-medium transition-colors ${
                          booking.depositPaid 
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                            : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        }`}
                      >
                        {booking.depositPaid ? '✓ Paid' : '✗ Unpaid'}
                      </button>
                    </div>

                    {/* Waiver Status */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Waiver</span>
                      <span
                        className={`px-3 py-1 text-sm rounded-lg font-medium ${
                          booking.confirmWaiver 
                            ? ' text-green-400' 
                            : ' text-red-400'
                        }`}
                      >
                        {booking.confirmWaiver ? '✓ Signed' : '✗ Not Signed'}
                      </span>
                    </div>
                  </div>

                  {/* Waiver Details (if signed) */}
                  {booking.confirmWaiver && booking.electronicSignature && (
                    <div className="mt-2 p-2 bg-muted/30 rounded-lg text-xs">
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Signed by:</span> {booking.electronicSignature}
                      </p>
                      {booking.waiverSignedAt && (
                        <p className="text-muted-foreground">
                          <span className="font-medium text-foreground">Date:</span> {new Date(booking.waiverSignedAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard

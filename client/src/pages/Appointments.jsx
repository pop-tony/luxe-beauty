import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import { useOrderContext } from '../context/OrderContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, CheckCircle, Clock, AlertCircle, RefreshCw, ShoppingBag, ChevronDown, ChevronUp, XCircle, Scissors, User, Mail, Phone, Calendar, MessageSquare, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

const statusConfig = {
  'pending': {
    label: 'Pending',
    color: 'bg-gold-500',
    textColor: 'text-gold-700 dark:text-gold-300',
    bgColor: 'bg-gold-500/10',
    borderColor: 'border-gold-500/30',
    icon: Clock
  },
  'in_progress': {
    label: 'In Progress',
    color: 'bg-blue-500',
    textColor: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    icon: Sparkles
  },
  'finished': {
    label: 'Finished',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    icon: CheckCircle
  },
  'cancelled': {
    label: 'Cancelled',
    color: 'bg-red-500',
    textColor: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    icon: XCircle
  },
  'pending_sync': {
    label: 'Pending Sync',
    color: 'bg-gold-500',
    textColor: 'text-gold-700 dark:text-gold-300',
    bgColor: 'bg-gold-500/10',
    borderColor: 'border-gold-500/30',
    icon: AlertCircle
  },
};

const STATUS_GROUPS = {
  active: {
    label: 'Active',
    icon: Clock,
    statuses: ['pending', 'pending_sync']
  },
  in_progress: {
    label: 'In Progress',
    icon: Sparkles,
    statuses: ['in_progress']
  },
  finished: {
    label: 'Finished',
    icon: CheckCircle,
    statuses: ['finished']
  },
  cancelled: {
    label: 'Cancelled',
    icon: XCircle,
    statuses: ['cancelled']
  }
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold ${config.bgColor} ${config.textColor} border ${config.borderColor}`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
};

const AppointmentCard = ({ appointment }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const config = statusConfig[appointment.status] || statusConfig['pending'];
  const Icon = config.icon;

  const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
  const createdDate = new Date(appointment.createdAt || Date.now());

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`group overflow-hidden rounded-2xl border card transition-all hover:shadow-glow-gold ${config.borderColor}`}
    >
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <div className={`rounded-lg p-2 ${config.bgColor}`}>
                <Icon className={`h-4 w-4 ${config.textColor}`} />
              </div>
              <span className={`text-xs font-bold uppercase tracking-wide ${config.textColor}`}>
                {config.label}
              </span>
              {appointment.status === 'pending_sync' && (
                <span className="rounded-full bg-gold-500/15 px-2 py-0.5 text-[10px] font-bold text-gold-700 dark:text-gold-300 border border-gold-500/30">
                  OFFLINE
                </span>
              )}
            </div>
            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
              #{appointment._id?.slice(-8).toUpperCase() || 'LOCAL'}
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {format(createdDate, 'MMM dd, yyyy • h:mm a')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-heading font-bold text-gradient-gold">
              ₵{appointment.total?.toLocaleString() || '0'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-zinc-50/50 p-3 dark:bg-luxe-charcoal/30">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-gold-500/10 overflow-hidden">
            <img
              src={appointment.image}
              alt={appointment.serviceName}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-heading font-semibold text-luxe-black dark:text-luxe-white line-clamp-1">
              {appointment.serviceName || 'Appointment'}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {new Date(appointment.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} • {appointment.time}
            </p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200/60 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-luxe-graphite/60 dark:text-zinc-300 dark:hover:bg-luxe-charcoal/50"
        >
          {expanded? 'Hide Details' : 'View Details'}
          {expanded? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-zinc-200/60 bg-zinc-50/50 dark:border-luxe-graphite/60 dark:bg-luxe-black/50"
          >
            <div className="space-y-4 p-6">
              <h4 className="text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Appointment Details
              </h4>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="mt-0.5 h-4 w-4 flex-shrink-0 text-zinc-400" />
                  <div className="flex-1">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Customer</p>
                    <p className="text-sm font-semibold text-luxe-black dark:text-luxe-white">
                      {appointment.clientName || appointment.customerName}
                    </p>
                  </div>
                </div>

                {appointment.stylist && (
                  <div className="flex items-start gap-3">
                    <Scissors className="mt-0.5 h-4 w-4 flex-shrink-0 text-zinc-400" />
                    <div className="flex-1">
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">Stylist</p>
                      <p className="text-sm font-semibold text-luxe-black dark:text-luxe-white">
                        {appointment.stylist}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-zinc-400" />
                  <div className="flex-1">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Contact</p>
                    <p className="text-sm font-semibold text-luxe-black dark:text-luxe-white">
                      {appointment.phone}
                    </p>
                  </div>
                </div>

                {appointment.note && (
                  <div className="flex items-start gap-3">
                    <MessageSquare className="mt-0.5 h-4 w-4 flex-shrink-0 text-zinc-400" />
                    <div className="flex-1">
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">Note</p>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300">
                        {appointment.note}
                      </p>
                    </div>
                  </div>
                )}

                {appointment.paymentRef && (
                  <div className="rounded-lg bg-zinc-100 p-3 dark:bg-luxe-graphite/50">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Payment Ref: <span className="font-mono font-semibold text-luxe-black dark:text-luxe-white">{appointment.paymentRef}</span>
                    </p>
                    <p className="mt-1 text-[11px] text-red-600 dark:text-red-400">
                      Contact support with this for help
                    </p>
                  </div>
                )}
              </div>

              <button
                disabled={appointment.status === 'pending_sync'}
                onClick={() => navigate(`/appointment/${appointment._id}`)}
                className={`${appointment.status === 'pending_sync'? "hidden" : ""} mt-2 w-full btn-gold text-sm`}
              >
                Track Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Appointments = () => {
  const navigate = useNavigate();
  const { appointments, syncPendingAppointments, checkAppointmentsStatusUpdates } = useOrderContext();
  const [activeGroup, setActiveGroup] = useState('active');
  const [syncing, setSyncing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const stats = useMemo(() => {
    const active = appointments.filter(a => STATUS_GROUPS.active.statuses.includes(a.status));
    const completed = appointments.filter(a => STATUS_GROUPS.finished.statuses.includes(a.status));
    const totalSpent = appointments.filter(a =>!STATUS_GROUPS.cancelled.statuses.includes(a.status))
 .reduce((sum, a) => sum + (a.total || 0), 0);

    return {
      active: active.length,
      completed: completed.length,
      cancelled: appointments.filter(a => STATUS_GROUPS.cancelled.statuses.includes(a.status)).length,
      total: appointments.length,
      totalSpent
    };
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    const groupStatuses = STATUS_GROUPS[activeGroup].statuses;
    return appointments
 .filter(a => groupStatuses.includes(a.status))
 .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [appointments, activeGroup]);

  const handleSync = async () => {
    setSyncing(true);
    await syncPendingAppointments();
    setSyncing(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await checkAppointmentsStatusUpdates();
    setRefreshing(false);
    toast.success('Appointments refreshed');
  };

  const hasPendingSync = appointments.some(a => a.status === 'pending_sync');

  if (!appointments || appointments.length === 0) {
    return (
      <div className="min-h-screen bg-luxe-white dark:bg-luxe-black px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 inline-flex rounded-full bg-zinc-100 p-6 dark:bg-luxe-charcoal">
            <ShoppingBag className="h-16 w-16 text-zinc-400" />
          </div>
          <h1 className="mb-4 text-5xl font-heading font-black tracking-tight text-luxe-black dark:text-luxe-white">No Appointments Yet</h1>
          <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
            You haven't booked any appointment yet, book to see them here.
          </p>
          <button
            onClick={() => navigate('/services')}
            className="btn-gold"
          >
            Book Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxe-white dark:bg-luxe-black px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="mb-8 text-center">
            <span className="badge-gold mb-3 inline-block">Dashboard</span>
            <h1 className="mb-2 text-5xl font-heading font-black tracking-tight text-gradient-gold">
              Your Appointments
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Track and manage all your Luxe Beauty bookings
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="mb-6 flex shrink-0 items-center gap-2 rounded-xl border border-zinc-300 bg-luxe-white px-4 py-3 text-sm font-bold text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-50 dark:border-luxe-graphite dark:bg-luxe-charcoal dark:text-zinc-300 dark:hover:bg-luxe-graphite"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing? 'animate-spin' : ''}`} />
            {refreshing? 'Refreshing...' : 'Refresh'}
          </button>

          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Appointments', value: stats.total, icon: Package },
              { label: 'Active', value: stats.active, icon: Clock },
              { label: 'Finished', value: stats.completed, icon: CheckCircle },
              { label: 'Total Spent', value: `₵${stats.totalSpent.toLocaleString()}`, icon: ShoppingBag }
            ].map((stat, i) => (
              <div key={i} className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</p>
                    <p className="mt-2 text-3xl font-heading font-black text-luxe-black dark:text-luxe-white">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-gold-500" />
                </div>
              </div>
            ))}
          </div>

          {hasPendingSync && (
            <div className="mb-6 rounded-2xl border border-gold-500/30 bg-gold-500/10 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-gold-600 dark:text-gold-400" />
                  <p className="text-sm font-semibold text-gold-800 dark:text-gold-200">
                    You have appointments pending sync
                  </p>
                </div>
                <button
                  onClick={handleSync}
                  disabled={syncing}
                  className="flex items-center gap-2 rounded-lg bg-gold-500 px-4 py-2 text-sm font-bold text-luxe-black transition hover:bg-gold-600 disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${syncing? 'animate-spin' : ''}`} />
                  {syncing? 'Syncing...' : 'Retry Sync'}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto border-b border-zinc-200/60 dark:border-luxe-graphite/60">
          {Object.entries(STATUS_GROUPS).map(([key, group]) => {
            const Icon = group.icon;
            const count = appointments.filter(a => group.statuses.includes(a.status)).length;
            const isActive = activeGroup === key;

            return (
              <button
                key={key}
                onClick={() => setActiveGroup(key)}
                className={`cursor-pointer flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-bold transition ${
                  isActive
               ? 'border-gold-500 text-gold-600 dark:text-gold-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                {group.label}
                <span className={`rounded-full px-2 py-0.5 text-xs ${
                  isActive
               ? 'bg-gold-500 text-luxe-black shadow-glow-gold'
                    : 'bg-zinc-200 text-zinc-600 dark:bg-luxe-graphite dark:text-zinc-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {filteredAppointments.length > 0? (
            <motion.div
              key={activeGroup}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid gap-6 lg:grid-cols-2"
            >
              {filteredAppointments.map(appointment => (
                <AppointmentCard key={appointment._id} appointment={appointment} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <Package className="mx-auto mb-4 h-16 w-16 text-zinc-300 dark:text-luxe-graphite" />
              <p className="text-lg font-semibold text-zinc-600 dark:text-zinc-400">
                No {STATUS_GROUPS[activeGroup].label.toLowerCase()} appointments
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

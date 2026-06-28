import { useState } from 'react';
import { Search, RefreshCw, Mail, Phone, Calendar, Clock, CheckCircle2, XCircle, X, User, Hash, MessageSquare, FileText, DollarSign, Sparkles, Scissors } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const APPOINTMENT_STATUS_GROUPS = {
  all: { label: 'All', icon: Calendar },
  pending: { label: 'Pending', icon: Clock },
  finished: { label: 'Finished', icon: CheckCircle2 },
  in_progress: { label: 'In Progress', icon: Sparkles },
  cancelled: { label: 'Cancelled', icon: XCircle },
};

const StatusBadge = ({ status }) => {
  const config = {
    pending: {
      bg: 'bg-gold-500/15 dark:bg-gold-500/20',
      text: 'text-gold-700 dark:text-gold-300',
      border: 'border-gold-500/30',
      label: 'Pending'
    },
    finished: {
      bg: 'bg-emerald-500/15 dark:bg-emerald-500/20',
      text: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-500/30',
      label: 'Finished'
    },
    in_progress: {
      bg: 'bg-blue-500/15 dark:bg-blue-500/20',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-500/30',
      label: 'In Progress'
    },
    cancelled: {
      bg: 'bg-red-500/15 dark:bg-red-500/20',
      text: 'text-red-700 dark:text-red-300',
      border: 'border-red-500/30',
      label: 'Cancelled'
    },
  };
  const { bg, text, border, label } = config[status] || config.pending;
  return (
    <span className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border ${bg} ${text} ${border}`}>
      {label}
    </span>
  );
};

export default function Appointments({ appointments, updateAppointmentStatus }) {
  const [appointmentSearch, setAppointmentSearch] = useState('');
  const [appointmentStatusFilter, setAppointmentStatusFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const refreshAppointments = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    await updateAppointmentStatus(appointmentId, newStatus);
    if (selectedAppointment?._id === appointmentId) {
      setSelectedAppointment(prev => ({...prev, status: newStatus }));
    }
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesStatus = appointmentStatusFilter === 'all' || app.status === appointmentStatusFilter;
    const matchesSearch =
      app.clientName.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      app.email.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      app.serviceName.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      app.appointmentId?.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      app._id.toLowerCase().includes(appointmentSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = {
    all: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    finished: appointments.filter(a => a.status === 'finished').length,
    in_progress: appointments.filter(a => a.status === 'in_progress').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold text-gradient-gold">Appointments</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Manage your Luxe Beauty bookings</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search clients, services..."
              value={appointmentSearch}
              onChange={(e) => setAppointmentSearch(e.target.value)}
              className="input-luxe w-full pl-10 pr-4 text-sm"
            />
          </div>
          <button
            onClick={refreshAppointments}
            disabled={refreshing}
            className="btn-ghost border border-zinc-200 dark:border-luxe-graphite"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-zinc-200 dark:border-luxe-graphite">
        {Object.entries(APPOINTMENT_STATUS_GROUPS).map(([key, group]) => {
          const Icon = group.icon;
          const count = statusCounts[key] || 0;
          const isActive = appointmentStatusFilter === key;

          return (
            <button
              key={key}
              onClick={() => setAppointmentStatusFilter(key)}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-bold transition ${
                isActive
                 ? 'border-gold-500 text-gold-600 dark:text-gold-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              {group.label}
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
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

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10 border-b border-zinc-200 bg-zinc-50/80 dark:border-luxe-graphite dark:bg-luxe-charcoal/80 backdrop-blur-sm">
              <tr>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Customer</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Contact</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Service</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Price</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Date & Time</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Note</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-luxe-graphite/50">
              <AnimatePresence mode="popLayout">
                {filteredAppointments.map((appointment, idx) => (
                  <motion.tr
                    key={appointment._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: idx * 0.02, duration: 0.2 }}
                    onClick={() => setSelectedAppointment(appointment)}
                    className="group cursor-pointer transition-colors hover:bg-gold-500/5 dark:hover:bg-gold-500/10"
                  >
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-luxe-black dark:text-luxe-white">
                          {appointment.clientName}
                        </span>
                        <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                          {appointment.appointmentId || appointment._id.slice(-8).toUpperCase()}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex flex-col gap-0.5">
                        <a
                          href={`mailto:${appointment.email}`}
                          className="text-xs text-zinc-600 hover:text-gold-600 dark:text-zinc-400 dark:hover:text-gold-400 transition"
                        >
                          {appointment.email}
                        </a>
                        <a
                          href={`tel:${appointment.phone}`}
                          className="text-[11px] text-zinc-500 hover:text-gold-600 dark:text-zinc-400 dark:hover:text-gold-400 transition"
                        >
                          {appointment.phone}
                        </a>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-luxe-black dark:text-luxe-white">
                        {appointment.serviceName}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-lg font-black text-gold-600 dark:text-gold-400">
                        ₵{appointment.total?.toLocaleString()}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-luxe-black dark:text-luxe-white">
                          {new Date(appointment.date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          {appointment.time}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 max-w-[200px]">
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 line-clamp-2">
                        {appointment.note || '—'}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={appointment.status} />
                    </td>

                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={appointment.status}
                        onChange={(e) => handleStatusUpdate(appointment._id, e.target.value)}
                        className="input-luxe w-full px-2.5 py-1.5 text-xs font-semibold"
                      >
                        <option value="pending">Pending</option>
                        <option value="finished">Finished</option>
                        <option value="in_progress">In Progress</option>
                        <option value="cancelled">Cancel</option>
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredAppointments.length === 0 && (
            <div className="py-20 text-center">
              <Calendar className="mx-auto mb-3 h-12 w-12 text-zinc-300 dark:text-luxe-graphite" />
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                No appointments found
              </p>
              {appointmentSearch && (
                <button
                  onClick={() => { setAppointmentSearch(''); setAppointmentStatusFilter('all'); }}
                  className="mt-3 text-sm text-gold-600 hover:text-gold-500 dark:text-gold-400 font-semibold"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedAppointment && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAppointment(null)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="card-glass fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-zinc-200/40 dark:border-luxe-graphite/60 bg-gradient-to-r from-gold-500/10 to-transparent px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/20 shadow-glow-gold">
                    <FileText className="h-5 w-5 text-gold-600 dark:text-gold-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-luxe-black dark:text-luxe-white">
                      Appointment Details
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                      {selectedAppointment.appointmentId || selectedAppointment._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="btn-ghost p-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <StatusBadge status={selectedAppointment.status} />
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {new Date(selectedAppointment.createdAt).toLocaleString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-zinc-50/50 dark:bg-luxe-charcoal/50 border border-zinc-200/40 dark:border-luxe-graphite/40 p-4">
                      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        <User className="h-3.5 w-3.5" />
                        Customer
                      </div>
                      <p className="text-sm font-semibold text-luxe-black dark:text-luxe-white">
                        {selectedAppointment.clientName}
                      </p>
                    </div>

                    <div className="rounded-xl bg-zinc-50/50 dark:bg-luxe-charcoal/50 border border-zinc-200/40 dark:border-luxe-graphite/40 p-4">
                      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        <Scissors className="h-3.5 w-3.5" />
                        Stylist
                      </div>
                      <p className="text-sm font-semibold text-luxe-black dark:text-luxe-white">
                        {selectedAppointment.stylist || 'Not assigned'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-xl bg-zinc-50/50 dark:bg-luxe-charcoal/50 border border-zinc-200/40 dark:border-luxe-graphite/40 p-3">
                      <Mail className="h-4 w-4 text-gold-600 dark:text-gold-400" />
                      <div className="flex-1">
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Email</p>
                        <a
                          href={`mailto:${selectedAppointment.email}`}
                          className="text-sm font-medium text-luxe-black hover:text-gold-600 dark:text-luxe-white dark:hover:text-gold-400 transition"
                        >
                          {selectedAppointment.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl bg-zinc-50/50 dark:bg-luxe-charcoal/50 border border-zinc-200/40 dark:border-luxe-graphite/40 p-3">
                      <Phone className="h-4 w-4 text-gold-600 dark:text-gold-400" />
                      <div className="flex-1">
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Phone</p>
                        <a
                          href={`tel:${selectedAppointment.phone}`}
                          className="text-sm font-medium text-luxe-black hover:text-gold-600 dark:text-luxe-white dark:hover:text-gold-400 transition"
                        >
                          {selectedAppointment.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-zinc-50/50 dark:bg-luxe-charcoal/50 border border-zinc-200/40 dark:border-luxe-graphite/40 p-4">
                      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        <Sparkles className="h-3.5 w-3.5" />
                        Service
                      </div>
                      <p className="text-sm font-semibold text-luxe-black dark:text-luxe-white">
                        {selectedAppointment.serviceName}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gradient-to-br from-gold-500/10 to-gold-500/5 border border-gold-500/30 p-4">
                      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-600 dark:text-gold-400">
                        <DollarSign className="h-3.5 w-3.5" />
                        Price
                      </div>
                      <p className="text-2xl font-black text-gold-600 dark:text-gold-400">
                        ₵{selectedAppointment.total?.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-zinc-50/50 dark:bg-luxe-charcoal/50 border border-zinc-200/40 dark:border-luxe-graphite/40 p-4">
                      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        <Calendar className="h-3.5 w-3.5" />
                        Date
                      </div>
                      <p className="text-sm font-semibold text-luxe-black dark:text-luxe-white">
                        {new Date(selectedAppointment.date).toLocaleDateString('en-GB', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>

                    <div className="rounded-xl bg-zinc-50/50 dark:bg-luxe-charcoal/50 border border-zinc-200/40 dark:border-luxe-graphite/40 p-4">
                      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        <Clock className="h-3.5 w-3.5" />
                        Time
                      </div>
                      <p className="text-sm font-semibold text-luxe-black dark:text-luxe-white">
                       {selectedAppointment.time}
                      </p>
                    </div>
                  </div>

                  {selectedAppointment.note && (
                    <div className="rounded-xl bg-zinc-50/50 dark:bg-luxe-charcoal/50 border border-zinc-200/40 dark:border-luxe-graphite/40 p-4">
                      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        <MessageSquare className="h-3.5 w-3.5" />
                        Note
                      </div>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                        {selectedAppointment.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-zinc-200/40 dark:border-luxe-graphite/60 bg-zinc-50/50 dark:bg-luxe-charcoal/30 px-6 py-4">
                <div className="flex gap-2">
                  {selectedAppointment.status === 'pending' && (
                    <button
                      onClick={() => handleStatusUpdate(selectedAppointment._id, 'in_progress')}
                      className="btn-gold flex-1"
                    >
                      Start Service
                    </button>
                  )}
                  {selectedAppointment.status === 'in_progress' && (
                    <button
                      onClick={() => handleStatusUpdate(selectedAppointment._id, 'finished')}
                      className="btn-gold flex-1"
                    >
                      Mark Complete
                    </button>
                  )}
                  {selectedAppointment.status!== 'cancelled' && selectedAppointment.status!== 'finished' && (
                    <button
                      onClick={() => handleStatusUpdate(selectedAppointment._id, 'cancelled')}
                      className="btn-gold-outline flex-1!border-red-500!text-red-600 hover:!bg-red-500 hover:!text-white"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

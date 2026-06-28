import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useOrderContext } from '../context/OrderContext';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const statusConfig = {
  'pending': { label: 'Pending Payment', color: 'bg-gold-500', icon: '🕐', desc: 'Waiting for payment confirmation', step: 0 },
  'paid': { label: 'Payment Confirmed', color: 'bg-blue-500', icon: '💳', desc: 'We received your payment', step: 1 },
  'processing': { label: 'Processing Order', color: 'bg-orange-500', icon: '📦', desc: 'Picking & packing your items', step: 2 },
  'shipped': { label: 'Shipped', color: 'bg-indigo-500', icon: '🚚', desc: 'Your order is on the way', step: 3 },
  'delivered': { label: 'Delivered', color: 'bg-emerald-500', icon: '✅', desc: 'Enjoy your new pieces!', step: 4 },
  'cancelled': { label: 'Cancelled', color: 'bg-red-500', icon: '❌', desc: 'Order was cancelled', step: 0 }
};

const trackingSteps = [
  { key: 'paid', label: 'Confirmed' },
  { key: 'processing', label: 'Processing' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' }
];

const InfoRow = ({ label, value, mono = false }) => (
  <div className="flex flex-col gap-1 border-b border-zinc-200/60 py-3 last:border-0 dark:border-luxe-graphite/60 sm:flex-row sm:items-center sm:justify-between">
    <span className="text-sm text-zinc-500 dark:text-zinc-400">{label}</span>
    <span className={`font-semibold text-luxe-black dark:text-luxe-white ${mono? 'font-mono text-sm' : ''}`}>
      {value}
    </span>
  </div>
);

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed right-4 top-20 z-50 animate-slide-in rounded-xl bg-luxe-black px-6 py-4 text-luxe-white shadow-glow-gold dark:bg-gold-500 dark:text-luxe-black">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🔔</span>
        <p className="font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useOrderContext();
  const [order, setOrder] = useState(null);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [toast, setToast] = useState(null);
  const [notifPermission, setNotifPermission] = useState('default');
  const pollInterval = useRef(null);

  const backendUrl = import.meta.env.VITE_ENV === "development"? import.meta.env.VITE_BACKEND_URL : "/api";

  useEffect(() => {
    if ('Notification' in window) {
      setNotifPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    try {
      if (!('Notification' in window)) {
        alert('This browser does not support notifications');
        return;
      }
      const permission = await Notification.requestPermission();
      setNotifPermission(permission);
      if (permission === 'granted') {
        new Notification('Luxe Beauty', {
          body: 'Notifications enabled! You\'ll get updates for this order.',
          icon: '/logo.png'
        });
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const found = orders.find(o => o._id === id || o.id === id);
    if (found) {
      setOrder(found);
    }
  }, [id, orders]);

  useEffect(() => {
    if (!id ||!isLive) return;

    const fetchOrderStatus = async () => {
      try {
        const res = await axios.get(`${backendUrl}/order/io-data?orderId=${id}`);
        if (res.data.success) {
          const newOrder = res.data.data;

          setOrder(prev => {
            if (prev?.status!== newOrder.status && prev?.status) {
              const newConfig = statusConfig[newOrder.status];
              setToast(`Status updated: ${newConfig.label}`);

              if (notifPermission === 'granted') {
                new Notification('Luxe Beauty Order Update', {
                  body: `${newOrder.itemName} is now ${newConfig.label}`,
                  icon: '/logo.png',
                  tag: `order-${id}`,
                });
              }
              updateOrderStatus?.(id, newOrder.status);
            }
            return newOrder;
          });
          setLastUpdated(new Date());
        }
      } catch (error) {
        console.error('[LIVE] Failed to fetch order:', error);
      }
    };

    fetchOrderStatus();
    pollInterval.current = setInterval(fetchOrderStatus, 50000);

    if (order?.status === 'delivered' || order?.status === 'cancelled') {
      setIsLive(false);
    }

    return () => {
      if (pollInterval.current) clearInterval(pollInterval.current);
    };
  }, [id, isLive, order?.status, updateOrderStatus, notifPermission]);

  if (!order) {
    return (
      <div className="min-h-screen bg-luxe-white px-4 py-24 text-center dark:bg-luxe-black">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="mb-4 text-4xl font-heading font-bold text-luxe-black dark:text-luxe-white">Order Not Found</h1>
        <button
          onClick={() => navigate('/orders')}
          className="btn-gold"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const config = statusConfig[order.status] || statusConfig['pending'];
  const currentStep = config.step;
  const orderDate = new Date(order.createdAt).toLocaleString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-luxe-white px-4 py-24 text-luxe-black dark:bg-luxe-black dark:text-luxe-white">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-zinc-600 transition hover:text-gold-600 dark:text-zinc-400 dark:hover:text-gold-400"
          >
            ← Back to Orders
          </button>

          {notifPermission!== 'granted' && (
            <button
              onClick={requestNotificationPermission}
              className="btn-gold text-sm"
            >
              🔔 Enable Notifications
            </button>
          )}
          {notifPermission === 'granted' && (
            <div className="flex items-center gap-2 rounded-lg bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              <span>✓</span> Notifications On
            </div>
          )}
        </div>

        {isLive && order.status!== 'delivered' && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-2 text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-emerald-700 dark:text-emerald-300">Live Tracking Active</span>
            {lastUpdated && (
              <span className="text-xs text-emerald-600 dark:text-emerald-500">
                - Updated {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        )}

        <div className="card-glass overflow-hidden">
          <div className={`${config.color} px-6 py-8 text-white transition-all duration-500`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-4xl">{config.icon}</span>
                  <h1 className="text-3xl font-heading font-bold">{config.label}</h1>
                </div>
                <p className="text-white/80">{config.desc}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/70">Order ID</p>
                <p className="font-mono text-lg font-bold">#{order._id.slice(-8).toUpperCase()}</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-50/50 p-6 dark:bg-luxe-charcoal/30">
            <h3 className="mb-4 text-sm font-bold uppercase text-zinc-500 dark:text-zinc-400">Order Progress</h3>
            <div className="flex items-center justify-between">
              {trackingSteps.map((step, idx) => {
                const stepConfig = statusConfig[step.key];
                const isActive = currentStep >= stepConfig.step;
                const isCurrent = currentStep === stepConfig.step;

                return (
                  <React.Fragment key={step.key}>
                    <div className="flex flex-col items-center">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 ${
                        isActive
                      ? `${stepConfig.color} text-white scale-110 shadow-glow-gold`
                         : 'bg-zinc-300 text-zinc-500 dark:bg-luxe-graphite'
                      } ${isCurrent? 'ring-4 ring-gold-500/30 animate-pulse' : ''}`}>
                        {isActive? '✓' : idx + 1}
                      </div>
                      <span className={`mt-2 text-xs font-medium ${
                        isActive? 'text-luxe-black dark:text-luxe-white' : 'text-zinc-400'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                    {idx < trackingSteps.length - 1 && (
                      <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                        currentStep > stepConfig.step? stepConfig.color : 'bg-zinc-300 dark:bg-luxe-graphite'
                      }`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-heading font-bold">Order Summary</h2>

            <div className="mb-8 flex gap-4 rounded-2xl bg-zinc-50/50 p-4 dark:bg-luxe-charcoal/30">
              <img
                src={order.image}
                alt={order.itemName}
                className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-heading font-bold">{order.itemName}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Size: {order.size} • Color: {order.color} • Qty: {order.quantity}
                </p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">₵{order.price} each</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-heading font-bold text-gradient-gold">₵{order.total}</p>
              </div>
            </div>

            <div className="space-y-1 rounded-2xl bg-zinc-50/50 p-6 dark:bg-luxe-charcoal/30">
              <h3 className="mb-4 text-lg font-heading font-bold">Shipping Information</h3>
              <InfoRow label="Customer Name" value={order.customerName} />
              <InfoRow label="Email" value={order.email} />
              <InfoRow label="Phone" value={order.phone} mono />
              <InfoRow label="Shipping Address" value={order.address} />
              <InfoRow label="Payment Reference" value={order.paymentRef} mono />
              <InfoRow label="Order Date" value={orderDate} />
            </div>

            <div className="mt-6 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-500/5 border border-gold-500/30 p-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">Total Paid</span>
                <span className="text-3xl font-heading font-bold text-gradient-gold">₵{order.total}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-200/60 bg-zinc-50/50 p-6 dark:border-luxe-graphite/60 dark:bg-luxe-charcoal/30">
            <div className="flex flex-col gap-3 sm:flex-row">
              {order.status === 'delivered' && (
                <button className="btn-gold flex-1">
                  Buy Again
                </button>
              )}
              <button
                onClick={() => navigate('/shop')}
                className="btn-gold-outline flex-1"
              >
                Continue Shopping
              </button>
              <button
              onClick={() => navigate('/contact')}
              className="btn-ghost">
                Get Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

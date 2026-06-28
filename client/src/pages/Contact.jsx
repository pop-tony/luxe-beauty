import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const backendUrl = import.meta.env.VITE_ENV === "development"? import.meta.env.VITE_BACKEND_URL : "/api";

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    try {
      const res = await axios.post(`${backendUrl}/order/consult`, {formData});

      if (res.data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch(err) {
      setStatus('error');
      console.error(err)
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({...errors, [e.target.name]: '' });
  };

  return (
    <div className="bg-luxe-white dark:bg-luxe-black text-luxe-black dark:text-luxe-white">
      <div className="container-luxe py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="badge-gold mb-4 inline-block">Get in Touch</span>
          <h1 className="text-5xl font-heading text-gradient-gold mb-4">Contact Luxe Beauty</h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Have a question about wigs, hair styling, or piercing? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-8 mb-10">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-gold-500/15 rounded-2xl flex items-center justify-center shadow-glow-gold">
                  <MapPin className="h-6 w-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1 text-lg">Location</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Luxe Beauty Studio<br />
                    Market Road, Madina<br />
                    Accra, Ghana
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-gold-500/15 rounded-2xl flex items-center justify-center shadow-glow-gold">
                  <Phone className="h-6 w-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1 text-lg">Phone</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">+233 20 123 4567</p>
                  <p className="text-zinc-600 dark:text-zinc-400">+233 24 987 6543</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-gold-500/15 rounded-2xl flex items-center justify-center shadow-glow-gold">
                  <Mail className="h-6 w-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1 text-lg">Email</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">hello@luxebeauty.com</p>
                  <p className="text-zinc-600 dark:text-zinc-400">bookings@luxebeauty.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-gold-500/15 rounded-2xl flex items-center justify-center shadow-glow-gold">
                  <Clock className="h-6 w-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1 text-lg">Hours</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">Mon - Fri: 9:00 AM - 7:00 PM</p>
                  <p className="text-zinc-600 dark:text-zinc-400">Saturday: 9:00 AM - 8:00 PM</p>
                  <p className="text-zinc-600 dark:text-zinc-400">Sunday: 12:00 PM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="card overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.7617743179154!2d-0.1776996852341367!3d5.556017995990464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a7b8b7a7b%3A0x5e5e5e5e!2sOsu%2C%20Accra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Luxe Beauty Studio Location"
              ></iframe>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card-glass p-8 space-y-6"
          >
            <div>
              <h2 className="text-3xl font-heading text-gradient-gold mb-2">Send us a message</h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                We'll respond within 24 hours
              </p>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm">Name <span className="text-gold-500">*</span> </label>
              <input
                type="text"
                value={formData.name}
                name="name"
                onChange={handleChange}
                className="input-luxe w-full"
                required
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm">Email <span className="text-gold-500">*</span> </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-luxe w-full"
                required
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm">Phone Number <span className="text-gold-500">*</span> </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-luxe w-full"
                placeholder="+233 50 123 4567"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm">Subject <span className="text-gold-500">*</span> </label>
              <input
                type="text" name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Wig consultation, piercing booking..."
                className="input-luxe w-full"
                required
              />
              {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm">Message <span className="text-gold-500">*</span> </label>
              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="input-luxe w-full resize-none"
                required
              ></textarea>
              {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="btn-gold w-full"
              disabled={status ==='success'}
            >
              {status ==='success'? 'Message Sent!' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}

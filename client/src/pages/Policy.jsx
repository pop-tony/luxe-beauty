import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Policy() {
  return (
    <div className="min-h-screen bg-luxe-white dark:bg-luxe-black py-20">
      <div className="container-luxe max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 
                   hover:text-gold-600 dark:hover:text-gold-400 mb-8 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <FileText className="h-8 w-8 text-gold-500" />
              <h1 className="text-4xl lg:text-5xl font-heading text-gradient-gold">
                Policies & Terms
              </h1>
            </div>
            <div className="divider-gold max-w-md mx-auto mb-6" />
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">
              Thank you for choosing D’Luxe wigs. We are committed to providing premium wigs 
              and quality hairstyling services. By booking an appointment or placing an order, 
              you agree to the following policies.
            </p>
          </div>

          {/* Wig Orders */}
          <section className="card p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gold-500/15 flex items-center justify-center">
                <Shield className="h-5 w-5 text-gold-500" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-luxe-black dark:text-luxe-white">
                Wig Orders
              </h2>
            </div>
            
            <ul className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <li className="flex gap-3">
                <span className="text-gold-500 font-bold mt-1">•</span>
                <span><strong>Full payment is required</strong> before any wig order is processed.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold-500 font-bold mt-1">•</span>
                <span><strong>Custom-made wigs are non-refundable</strong> and cannot be exchanged once production has begun.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold-500 font-bold mt-1">•</span>
                <span><strong>Ready-to-ship wigs</strong> may only be exchanged within 7 days, provided they are unworn, unaltered, and returned in their original packaging.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold-500 font-bold mt-1">•</span>
                <span><strong>For hygiene reasons,</strong> worn or customized wigs cannot be returned or exchanged.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold-500 font-bold mt-1">•</span>
                <span>If you receive the <strong>wrong item or a defective item</strong>, please contact us within 48 hours of delivery and include clear photos or videos.</span>
              </li>
            </ul>
          </section>

          {/* Hairstyling Appointments */}
          <section className="card p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gold-500/15 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-gold-500" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-luxe-black dark:text-luxe-white">
                Hairstyling Appointments
              </h2>
            </div>
            
            <ul className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <li className="flex gap-3">
                <span className="text-gold-500 font-bold mt-1">•</span>
                <span>A <strong>non-refundable booking fee of ₵100</strong> is required to secure all appointments.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold-500 font-bold mt-1">•</span>
                <span>Please <strong>arrive on time</strong>. Clients who arrive more than 15 minutes late may be rescheduled or have their appointment cancelled.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold-500 font-bold mt-1">•</span>
                <span>Appointments may be <strong>rescheduled with at least 24 hours’ notice</strong>. Late cancellations and no-shows will forfeit the booking fee.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold-500 font-bold mt-1">•</span>
                <span>Please arrive with <strong>clean, detangled hair</strong> unless otherwise instructed. Additional charges may apply if preparation is required.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold-500 font-bold mt-1">•</span>
                <span><strong>Wigs brought in for installation</strong> must be clean and free from glue or product buildup.</span>
              </li>
            </ul>
          </section>

          {/* General Policy */}
          <section className="card p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gold-500/15 flex items-center justify-center">
                <FileText className="h-5 w-5 text-gold-500" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-luxe-black dark:text-luxe-white">
                General Policy
              </h2>
            </div>
            
            <ul className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <li className="flex gap-3">
                <span className="text-gold-500 font-bold mt-1">•</span>
                <span><strong>Prices may vary</strong> depending on hair length, density, styling complexity, or additional services.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold-500 font-bold mt-1">•</span>
                <span><strong>Photos and videos</strong> may be taken during your appointment for promotional purposes. Kindly inform us before your appointment if you prefer not to be featured.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold-500 font-bold mt-1">•</span>
                <span>We <strong>do not offer refunds</strong> on completed services or custom wig orders.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold-500 font-bold mt-1">•</span>
                <span>We <strong>reserve the right to refuse service</strong> to anyone displaying disrespectful or inappropriate behaviour.</span>
              </li>
            </ul>
          </section>

          {/* Footer Note */}
          <div className="card-glass p-8 text-center border-gold-500/30">
            <p className="text-luxe-black dark:text-luxe-white text-lg font-medium mb-2">
              Thank you for your support.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              We look forward to providing you with a luxury experience at D’Luxe wigs.
            </p>
            <div className="divider-gold max-w-xs mx-auto mt-6 mb-6" />
            <Link to="/contact" className="btn-gold-outline inline-block">
              Contact Us With Questions
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

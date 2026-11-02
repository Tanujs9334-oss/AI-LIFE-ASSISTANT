import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Building2,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Feedback & Support');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Dhanyawaad! Your message has been received by our India support desk.');
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          We&apos;d Love to Hear From You
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Whether you have feedback, need technical support, or represent an educational institution or MSME, our support desk in Bengaluru and Delhi is here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <h2 className="text-base font-bold text-white">Send Us a Direct Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tanuj Sharma"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tanuj@example.com"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Topic / Category</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
              >
                <option value="Product Feedback & Support">Product Feedback &amp; Support</option>
                <option value="Enterprise / MSME Inquiries">Enterprise / MSME Inquiries</option>
                <option value="Government & Educational Partnerships">Government &amp; Educational Partnerships</option>
                <option value="Data Privacy & Security Desk">Data Privacy &amp; Security Desk</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Your Message *</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="How can we assist you today? Feel free to write in English or Hindi..."
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Sending Message...' : 'Submit Message'}</span>
            </button>
          </form>
        </div>

        {/* Office Details & Direct Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-xs text-slate-300">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Our Indian Technology Hubs</span>
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-white block">Bengaluru R&amp;D Center</span>
              <p className="text-slate-400">
                100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-white block">New Delhi Policy &amp; Public Desk</span>
              <p className="text-slate-400">
                Barakhamba Road, Connaught Place, New Delhi 110001
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>support@bharatai.in • partnerships@bharatai.in</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Mon – Sat: 9:00 AM – 7:00 PM IST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

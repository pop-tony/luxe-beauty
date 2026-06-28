import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Send, X } from 'lucide-react';

const defaultReviews = [
  { id: 1, name: 'Ama K.', text: 'Best silk press in Accra! The Luxe Beauty team is amazing and booking was so easy.', rating: 5, date: '2 days ago' },
  { id: 2, name: 'Efua M.', text: 'My lace install lasted 4 weeks. Wigs are top tier. Will definitely be back!', rating: 5, date: '1 week ago' },
  { id: 3, name: 'Kojo B.', text: 'Finally a studio that respects my time. Piercing was clean, quick, and painless.', rating: 5, date: '3 days ago' }
];

export default function LiveTestimonials() {
  const [reviews, setReviews] = useState(defaultReviews);
  const [current, setCurrent] = useState(0);
  const [form, setForm] = useState({ name: '', text: '', rating: 5 });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const next = () => setCurrent(prev => (prev + 1) % reviews.length);
  const prev = () => setCurrent(prev => (prev - 1 + reviews.length) % reviews.length);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      id: Date.now(),
    ...form,
      date: 'Just now'
    };
    setReviews([newReview,...reviews]);
    setForm({ name: '', text: '', rating: 5 });
    setShowForm(false);
    setCurrent(0);
  };

  return (
    <section className="container-luxe py-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
        <div>
          <span className="badge-gold mb-3 inline-block">Testimonials</span>
          <h2 className="text-4xl font-heading text-gradient-gold">Client Love</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={showForm? "btn-ghost" : "btn-gold-outline"}
        >
          {showForm? <><X className="h-4 w-4" /> Cancel</> : 'Leave a Review'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card-glass p-6 md:p-8 mb-12 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              className="input-luxe"
              required
            />
            <select
              value={form.rating}
              onChange={e => setForm({...form, rating: Number(e.target.value)})}
              className="input-luxe"
            >
              <option value={5}>★★★★★ 5 Stars</option>
              <option value={4}>★★★★☆ 4 Stars</option>
              <option value={3}>★★★☆☆ 3 Stars</option>
            </select>
          </div>
          <textarea
            placeholder="Share your experience at Luxe Beauty..."
            value={form.text}
            onChange={e => setForm({...form, text: e.target.value})}
            rows="4"
            className="input-luxe w-full"
            required
          />
          <button type="submit" className="btn-gold flex items-center gap-2">
            Post Review <Send className="h-4 w-4" />
          </button>
        </form>
      )}

      <div className="relative card-glass p-8 md:p-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px divider-gold opacity-50" />

        <div className="flex gap-1 mb-6 justify-center">
          {[...Array(reviews[current].rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-gold-500 text-gold-500" />
          ))}
        </div>

        <p className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 text-center mb-8 font-body italic leading-relaxed">
          "{reviews[current].text}"
        </p>

        <div className="text-center">
          <p className="font-heading font-semibold text-lg text-luxe-black dark:text-luxe-white">{reviews[current].name}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{reviews[current].date}</p>
        </div>

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-luxe-white/80 dark:bg-luxe-charcoal/80 backdrop-blur-sm hover:bg-gold-500 hover:text-luxe-black transition-all duration-200 hover:shadow-glow-gold"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-luxe-white/80 dark:bg-luxe-charcoal/80 backdrop-blur-sm hover:bg-gold-500 hover:text-luxe-black transition-all duration-200 hover:shadow-glow-gold"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="flex justify-center gap-2 mt-10">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current? 'bg-gold-500 w-8 shadow-glow-gold' : 'bg-zinc-300 dark:bg-luxe-graphite w-1.5 hover:bg-gold-500/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

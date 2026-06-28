import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function About() {
  const team = [
    { name: 'Selorm A.', role: 'Lead Stylist', specialty: 'Natural Hair & Color', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' },
    { name: 'Efua M.', role: 'Nail Tech', specialty: 'Acrylics & Nail Art', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
    { name: 'Kwame T.', role: 'Barber', specialty: 'Fades & Beard Grooming', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' }
  ];

  return (
    <div className="bg-luxe-white dark:bg-luxe-black">
      <div className="container-luxe py-20 lg:py-28">
        <div className="max-w-3xl mb-20">
          <span className="badge-gold mb-4 inline-block">Our Story</span>
          <h1 className="text-5xl font-heading font-bold mb-6 text-gradient-gold">
            About Luxe Beauty
          </h1>
          <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
            Founded in Accra, Luxe Beauty was built to make premium beauty accessible and booking stress-free.
            We combine skilled artistry with tech so you spend less time waiting and more time glowing.
          </p>
          <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
            From custom wig fittings to professional piercing, our team is trained on the latest techniques
            and uses only professional-grade products. Walk in, book online, or shop from home.
          </p>
        </div>

        <div className="divider-gold mb-20 opacity-30" />

        <h2 className="text-4xl font-heading text-gradient-gold mb-12">Meet The Team</h2>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full aspect-square object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxe-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-luxe-black dark:text-luxe-white">{member.name}</h3>
              <p className="text-gold-600 dark:text-gold-400 font-semibold mt-1">{member.role}</p>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2">{member.specialty}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

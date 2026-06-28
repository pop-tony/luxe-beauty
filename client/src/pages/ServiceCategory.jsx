import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { services } from '../data/services';
import ServiceCard from '../components/ServiceCard';

export default function ServiceCategory() {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName);
  const categoryServices = services.filter(s => s.category === decodedCategory);

  if (categoryServices.length === 0) {
    return (
      <div className="min-h-screen bg-luxe-white dark:bg-luxe-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-heading text-luxe-black dark:text-luxe-white mb-4">
            No services found in {decodedCategory}
          </p>
          <Link to="/services" className="btn-gold-outline">
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxe-white dark:bg-luxe-black py-20">
      <div className="container-luxe">
        <Link 
          to="/services" 
          className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 
                   hover:text-gold-600 dark:hover:text-gold-400 mb-8 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Categories
        </Link>

        <div className="mb-12">
          <span className="badge-gold mb-3 inline-block">{decodedCategory}</span>
          <h1 className="text-4xl lg:text-5xl font-heading text-gradient-gold mb-3">
            {decodedCategory}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            {categoryServices.length} {categoryServices.length === 1 ? 'service' : 'services'} available
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}

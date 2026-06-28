import ServiceCategoryCard from '../components/ServiceCategoryCard';
import { services } from '../data/services';

// Group services by category
const getServiceCategories = () => {
  const categoryMap = {};
  services.forEach(service => {
    if (!categoryMap[service.category]) {
      categoryMap[service.category] = {
        name: service.category,
        image: service.image, // Use first service image as category image
        count: 0,
        services: []
      };
    }
    categoryMap[service.category].count++;
    categoryMap[service.category].services.push(service);
  });
  return Object.values(categoryMap);
};

export default function Services() {
  const categories = getServiceCategories();

  return (
    <div className="min-h-screen bg-luxe-white dark:bg-luxe-black py-20">
      <div className="container-luxe">
        <div className="text-center mb-16">
          <span className="badge-gold mb-4 inline-block">Our Services</span>
          <h1 className="text-5xl lg:text-6xl font-heading text-gradient-gold mb-4">
            Premium Beauty Services
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
            Choose a category to explore our professional services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map(category => (
            <ServiceCategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}

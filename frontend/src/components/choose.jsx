import { FaCogs, FaWarehouse, FaWrench, FaShieldAlt, FaTruck, FaHandshake } from 'react-icons/fa';

const features = [
  {
    icon: <FaWarehouse className="text-blue-600 text-3xl" />,
    title: 'Extensive Inventory',
    description: 'Wide range of water pumps, submersible motors, handpumps, and industrial tools in stock.'
  },
  {
    icon: <FaCogs className="text-blue-600 text-3xl" />,
    title: 'High-Performance Machinery',
    description: 'Only premium-quality, field-tested equipment suitable for domestic, agricultural, and industrial use.'
  },
  {
    icon: <FaWrench className="text-blue-600 text-3xl" />,
    title: 'In-House Assembly Support',
    description: 'Custom pump and tool setup based on customer needs with expert mechanical technicians.'
  },
  {
    icon: <FaShieldAlt className="text-blue-600 text-3xl" />,
    title: 'Quality Assurance',
    description: 'Every product is verified for durability, efficiency, and long-term performance.'
  },
  {
    icon: <FaTruck className="text-blue-600 text-3xl" />,
    title: 'Fast Delivery',
    description: 'Reliable and quick delivery to urban and rural areas across India.'
  },
  {
    icon: <FaHandshake className="text-blue-600 text-3xl" />,
    title: 'Trusted Supplier',
    description: 'Serving thousands of happy customers with honest pricing and dependable service.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16 px-6" id="why-choose-us">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Leading supplier of water pumps, handpumps, submersible motors, and industrial tools across India.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-center justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import {
  FaCogs,
  FaIndustry,
  FaTools,
  FaWater,
  FaPumpSoap,
} from 'react-icons/fa';
import NavBar from '../miniComponents/navabar';

function AboutPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-white text-gray-900 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-4">
              Powering Progress with Reliable Machinery
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              At <span className="text-blue-700 font-semibold">Maheshwari Machineries</span>,
              we deliver a wide range of high-performance machinery — from submersible water pumps
              and PVC pipes to industrial tools and spare parts — built for durability, efficiency,
              and long-term value.
            </p>
          </div>

          {/* Who We Are & What We Do */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-blue-700">Who We Are</h2>
              <p className="text-gray-700 mb-4">
                Maheshwari Machineries is a trusted supplier of water management solutions,
                piping systems, and industrial-grade tools. We serve agriculture, construction,
                and industrial sectors with products that meet the most demanding performance standards.
              </p>
              <p className="text-gray-700 mb-4">
                From submersible motors that keep irrigation flowing to PVC pipes and fittings
                that strengthen construction, we ensure every product is built for consistency
                and long service life.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-blue-700">What We Offer</h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <FaWater className="text-blue-700" />
                  <span className="text-gray-700">Submersible Pumps & Motors</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaPumpSoap className="text-blue-700" />
                  <span className="text-gray-700">Hand Pumps & Accessories</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaTools className="text-blue-700" />
                  <span className="text-gray-700">Industrial Tools & Spare Parts</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaIndustry className="text-blue-700" />
                  <span className="text-gray-700">PVC Pipes & Fittings</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCogs className="text-blue-700" />
                  <span className="text-gray-700">General Industrial Machinery</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Basic Information */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">Basic Information</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-gray-700 text-sm max-w-4xl mx-auto">
              <p><span className="text-blue-700 font-semibold">Nature of Business:</span> Retailer & Supplier</p>
              <p><span className="text-blue-700 font-semibold">Company Owner:</span> Darpan Maheshwari</p>
              <p><span className="text-blue-700 font-semibold">Legal Status:</span> Proprietorship</p>
            </div>
          </div>

          {/* Statutory Profile */}
          <div className="mt-10 text-gray-700 text-sm text-center">
            <h2 className="text-2xl font-bold mb-2 text-blue-700">Statutory Profile</h2>
            <p><span className="text-blue-700 font-semibold">GST No.:</span> Will be provided upon request</p>
          </div>

          {/* Work Experience */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">Industry Experience</h2>
            <ul className="text-gray-700 space-y-3 max-w-5xl mx-auto text-sm list-disc pl-5">
              <li>Supplying pumps and motors for agricultural irrigation and water projects.</li>
              <li>Providing hand pumps and accessories for rural and urban communities.</li>
              <li>Trusted source for industrial PVC pipes, fittings, and plumbing components.</li>
              <li>Experience in delivering industrial tools and heavy-duty spare parts.</li>
              <li>Serving customers across agriculture, manufacturing, and construction sectors.</li>
            </ul>
          </div>

          {/* Mission */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Our Mission</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              To empower industries, farmers, and businesses with reliable, durable,
              and cost-effective machinery solutions that drive growth and sustainability.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;

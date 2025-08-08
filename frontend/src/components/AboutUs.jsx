import {
  FaCogs,
  FaIndustry,
  FaTools,
  FaWater,
  FaPumpSoap,
} from 'react-icons/fa';

function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-400 mb-4">
            Reliable Machinery for Every Industry
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            At <span className="text-orange-300 font-semibold">DhanShree Machinery</span>, we supply a wide range of durable and high-performance machinery products — from submersible water pumps to PVC pipes, hand pumps, and industrial tools — ensuring quality, reliability, and value.
          </p>
        </div>

        {/* Who We Are & What We Do */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-orange-300">Who We Are</h2>
            <p className="text-gray-400 mb-4">
              DhanShree Machinery is a trusted supplier of premium-grade water pumps, piping systems, and industrial tools. We cater to agricultural, commercial, and industrial sectors with products that meet the toughest performance standards.
            </p>
            <p className="text-gray-400 mb-4">
              Whether you need a reliable submersible motor for irrigation or durable PVC pipes for construction, our products are sourced and tested to deliver long-lasting performance in every environment.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-orange-300">What We Offer</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <FaWater className="text-orange-400" />
                <span className="text-gray-300">Submersible Pumps & Motors</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPumpSoap className="text-orange-400" />
                <span className="text-gray-300">Hand Pumps & Accessories</span>
              </li>
              <li className="flex items-center gap-3">
                <FaTools className="text-orange-400" />
                <span className="text-gray-300">Industrial Tools & Spare Parts</span>
              </li>
              <li className="flex items-center gap-3">
                <FaIndustry className="text-orange-400" />
                <span className="text-gray-300">PVC Pipes & Fittings</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCogs className="text-orange-400" />
                <span className="text-gray-300">General Industrial Machinery</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Basic Information */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4 text-orange-300 text-center">Basic Information</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-gray-300 text-sm max-w-4xl mx-auto">
            <p><span className="text-orange-400 font-semibold">Nature of Business:</span> Retailer & Supplier</p>
            <p><span className="text-orange-400 font-semibold">Company Owner:</span> Darpan Maheshwari</p>
            {/* <p><span className="text-orange-400 font-semibold">Employees:</span> Upto 50 People</p> */}
            <p><span className="text-orange-400 font-semibold">Legal Status:</span> Individual - Proprietor</p>
            {/* <p className="sm:col-span-2">
              <span className="text-orange-400 font-semibold">Registered Address:</span><br />
               No-11A, Gali Number 4, Mohan Nagar, Ghaziabad- 201007, Uttar Pradesh, India
            </p> */}
          </div>
        </div>

        {/* Statutory Profile */}
        <div className="mt-10 text-gray-300 text-sm text-center">
          <h2 className="text-2xl font-bold mb-2 text-orange-300">Statutory Profile</h2>
          <p><span className="text-orange-400 font-semibold">GST No.:</span>Developer Don,t know</p>
        </div>

        {/* Work Experience */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4 text-orange-300 text-center">Industry Experience</h2>
          <ul className="text-gray-300 space-y-3 max-w-5xl mx-auto text-sm list-disc pl-5">
            <li>Extensive supply experience for agricultural irrigation projects.</li>
            <li>Expertise in sourcing submersible and hand pumps for rural and urban applications.</li>
            <li>Supplying industrial-grade PVC pipes, fittings, and components for construction.</li>
            <li>Trusted partner for heavy-duty industrial tools and spare parts.</li>
            <li>Serving sectors including agriculture, manufacturing, and infrastructure.</li>
          </ul>
        </div>

        {/* Mission */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4 text-orange-300">Our Mission</h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            To provide durable, reliable, and cost-effective machinery products that empower industries, farmers, and communities with tools they can trust.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;

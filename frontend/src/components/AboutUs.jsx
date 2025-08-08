import {
  FaCogs,
  FaNetworkWired,
  FaTools,
  FaMicrochip,
  FaRobot,
} from 'react-icons/fa';

function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-400 mb-4">
            Empowering Automation with Precision
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            At <span className="text-orange-300 font-semibold">DhanShree Automation</span>, we specialize in delivering smart automation solutions to industries across the globe. Our goal is to make systems more efficient, reliable, and intelligent.
          </p>
        </div>

        {/* Who We Are & What We Do */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-orange-300">Who We Are</h2>
            <p className="text-gray-400 mb-4">
              DhanShree Automation is a team of engineers and automation experts driven by the mission to bring intelligent automation into every industry. From PLC programming to control panel design, we offer full-spectrum services tailored to your needs.
            </p>
            <p className="text-gray-400 mb-4">
              We integrate the latest technologies including IoT, remote monitoring, and industrial AI to help businesses automate safely and efficiently.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-orange-300">What We Do</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <FaCogs className="text-orange-400" />
                <span className="text-gray-300">Industrial Automation & Integration</span>
              </li>
              <li className="flex items-center gap-3">
                <FaNetworkWired className="text-orange-400" />
                <span className="text-gray-300">PLC & SCADA System Programming</span>
              </li>
              <li className="flex items-center gap-3">
                <FaTools className="text-orange-400" />
                <span className="text-gray-300">Custom Control Panel Manufacturing</span>
              </li>
              <li className="flex items-center gap-3">
                <FaMicrochip className="text-orange-400" />
                <span className="text-gray-300">IoT-based Remote Monitoring</span>
              </li>
              <li className="flex items-center gap-3">
                <FaRobot className="text-orange-400" />
                <span className="text-gray-300">Smart Automation Solutions</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Basic Information */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4 text-orange-300 text-center">Basic Information</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-gray-300 text-sm max-w-4xl mx-auto">
            <p><span className="text-orange-400 font-semibold">Nature of Business:</span> Wholesaler</p>
            <p><span className="text-orange-400 font-semibold">Company Owner:</span> Pradeep Sharma</p>
            <p><span className="text-orange-400 font-semibold">Employees:</span> Upto 50 People</p>
            <p><span className="text-orange-400 font-semibold">Legal Status:</span> Individual - Proprietor</p>
            <p className="sm:col-span-2">
              <span className="text-orange-400 font-semibold">Registered Address:</span><br />
              Shop No-11A, Gali Number 4, Mohan Nagar, Ghaziabad- 201007, Uttar Pradesh, India
            </p>
          </div>
        </div>

        {/* Statutory Profile */}
        <div className="mt-10 text-gray-300 text-sm text-center">
          <h2 className="text-2xl font-bold mb-2 text-orange-300">Statutory Profile</h2>
          <p><span className="text-orange-400 font-semibold">GST No.:</span> 09KQQPS3896J1ZF</p>
        </div>

        {/* Work Experience */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4 text-orange-300 text-center">Work Experience</h2>
          <ul className="text-gray-300 space-y-3 max-w-5xl mx-auto text-sm list-disc pl-5">
            <li>Expertise in Batch Process, Continuous Process, CPG, FMCG, Food & Beverage industries.</li>
            <li>Specialized in making processes for Chocolate, Dairy, Soap, Shampoo, Dry and Liquid Laundry, Dish Washer.</li>
            <li>Strong experience in Milk Process Plants, Evaporators, and Spray Dryers.</li>
            <li>Extensive automation experience in Food, Fabric & Home Care, Beauty Care, Skin Care, Baby Care, and Fem Care sectors.</li>
            <li>Skilled in Packaging Line Integration using systems like Akash, Jiny, Shubham, and Hassia.</li>
            <li>Comprehensive knowledge in Control System and MCC Panel Engineering.</li>
            <li>Expertise in Rockwell software and hardware from Allen Bradley, Mitsubishi, Omron, Schneider, and Siemens (DCS, PLC, HMI, VFD, Switchgear, Network Switches, Safety systems).</li>
            <li>Strong understanding of industrial networking: Ethernet, ControlNet, and DeviceNet.</li>
          </ul>
        </div>

        {/* Mission */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4 text-orange-300">Our Mission</h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            To drive industrial growth through intelligent automation, empower businesses with cutting-edge technology, and create a future where machines work smarter — not harder.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;

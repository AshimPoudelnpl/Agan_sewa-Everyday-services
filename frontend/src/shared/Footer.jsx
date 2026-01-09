const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Agan Sewa</h3>
            <p className="text-gray-300">Multi-branch service management system providing quality services across different locations.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/services" className="text-gray-300 hover:text-white">Services</a></li>
              <li><a href="/branches" className="text-gray-300 hover:text-white">Branches</a></li>
              <li><a href="/gallery" className="text-gray-300 hover:text-white">Gallery</a></li>
              <li><a href="/reviews" className="text-gray-300 hover:text-white">Reviews</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="text-gray-300 space-y-2">
              <p>Email: info@agansewa.com</p>
              <p>Phone: +977-1-4444444</p>
              <p>Address: Kathmandu, Nepal</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
          <p>&copy; 2024 Agan Sewa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
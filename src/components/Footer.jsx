export default function Footer() {
  return (
    <footer className="bg-sky-950 text-gray-200 mt-10">
      <div
        className="max-w-7xl mx-auto px-5 py-10 grid gap-8
                   grid-cols-1
                   sm:grid-cols-2
                   md:grid-cols-3
                   lg:grid-cols-4"
      >
        {/* Column 1 */}
        <div>
          <h2 className="text-yellow-400 text-lg font-bold mb-3">
            Online BookStore
          </h2>
          <p className="text-sm text-gray-300">
            Your one-stop destination for books, knowledge, and learning.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h2 className="text-yellow-400 text-lg font-bold mb-3">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>Books</li>
            <li>Categories</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h2 className="text-yellow-400 text-lg font-bold mb-3">
            Support
          </h2>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h2 className="text-yellow-400 text-lg font-bold mb-3">
            Contact Us
          </h2>
          <ul className="space-y-2 text-sm">
            <li>Email: raidasanuj6@gmail.com</li>
            <li>Phone: +977-9876543211</li>
            <li>Location: Nepal</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sky-800 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Online BookStore. All rights reserved.
      </div>
    </footer>
  );
}

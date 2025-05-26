export default function Footer() {
    return (
      <footer className="py-8 text-black">
        <div className="container mx-auto px-6 lg:px-20 flex flex-col md:flex-row justify-between items-center">
          {/* Logo / Branding */}
          <h2 className="text-2xl font-bold flex items-center gap-2">
            🚀 CodeQuest
          </h2>
  
          {/* Social Icons */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:scale-110 transition">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" className="w-5 h-5" />
            </a>
            <a href="https://github.com/rahil-den/CodeQuest" className="hover:scale-110 transition">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub" className="w-5 h-5" />
              
            </a>
            <a href="#" className="hover:scale-110 transition">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" className="w-5 h-5" />
            </a>
          </div>
        </div>
  
        {/* Copyright */}
        
       
        <div className="text-center mt-6 text-sm opacity-70">
          © {new Date().getFullYear()} CodeQuest. All rights reserved.
          Built and designed by {"Rahil"}.

        </div>
        {/* Additional Links */}
        <div className="text-center mt-2 text-sm opacity-70">
          <a href="#" className="hover:underline">Privacy Policy</a> | 
          <a href="#" className="hover:underline"> Terms of Service</a>
        </div>
      </footer>
    );
  }
  
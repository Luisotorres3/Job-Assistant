import { Github, Mail, Heart, Briefcase } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-footer text-foreground border-t border-border transition-colors duration-300">
      <div className="container mx-auto px-6 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                <Briefcase size={20} />
              </span>
              <span className="text-xl font-bold">Job Assistant</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              AI-powered platform to help job seekers manage applications,
              generate tailored CVs, and track their career journey efficiently.
            </p>
          </div>

          {/* Features section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Application Tracking
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                AI-Generated CVs
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Cover Letter Assistant
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Analytics Dashboard
              </li>
            </ul>
          </div>

          {/* Contact section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:contact@jobassistant.com"
                className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              Open source project designed for
              <br />
              AI-assisted productivity
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              © {currentYear} Job Assistant. Made with
              <Heart size={14} className="text-red-500 mx-1" />
              for job seekers
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a
                href="#"
                className="hover:text-foreground text-muted-foreground transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-foreground text-muted-foreground transition-colors duration-200"
              >
                Terms of Service
              </a>
              <span className="text-muted-foreground">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

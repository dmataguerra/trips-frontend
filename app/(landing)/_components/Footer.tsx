import Image from "next/image";
import { AcmeLogo } from "./Header";

export default function Footer() {
  return (
    <footer id="footer" className="bg-hero_bg mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <AcmeLogo />
          <div>
            <p className="font-bold text-text_primary">Chihuahueños</p>
            <p className="text-xs text-text_primary/80">Conectando destinos</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/dmataguerra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 bg-gray-300 hover:bg-gray-400 text-text_primary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition text-sm"
          >
            <Image src="/images/github-icon.svg" alt="github" width={18} height={18} />
            dmataguerra
          </a>
          <a
            href="https://github.com/karenca01"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 bg-gray-300 hover:bg-gray-400 text-text_primary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition text-sm"
          >
            <Image src="/images/github-icon.svg" alt="github" width={18} height={18} />
            karenca01
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs text-text_primary/70">© {new Date().getFullYear()} Chihuahueños S.A. de C.V. Todos los derechos reservados.</div>
      </div>
    </footer>
  );
}

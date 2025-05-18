import runningManLogo from '../assets/running-man.svg';

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-12 shadow-inner transition-all duration-500">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-2 text-lg font-semibold tracking-wide">
          <img
            src={runningManLogo}
            alt="FitLife Logo"
            className="h-7 w-7"
          />
          <span className="text-gray-900 dark:text-white">FitLife &copy; 2025</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-base">
          <a
            href="/privacy-policy"
            className="text-gray-500 dark:text-gray-300 hover:text-blue-700 dark:hover:text-white transition underline underline-offset-4"
          >
            Privacy Policy
          </a>
          <span className="hidden md:inline text-gray-400">|</span>
          <a
            href="/terms-of-service"
            className="text-gray-500 dark:text-gray-300 hover:text-blue-700 dark:hover:text-white transition underline underline-offset-4"
          >
            Terms of Service
          </a>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-300 mt-2 md:mt-0 md:text-right">
          Developed by{" "}
          <a
            href="https://github.com/Uvais-khan078/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-700 dark:hover:text-white"
          >
            Uvais_khan078
          </a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner mt-auto">
      <div className="container mx-auto px-6 py-4 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Job Assistant. All rights reserved.</p>
      </div>
    </footer>
  );
}

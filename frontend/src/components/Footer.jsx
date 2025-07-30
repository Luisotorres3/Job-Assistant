export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white shadow-inner py-4 mt-10">
      <div className="container mx-auto px-6 text-center text-white text-sm">
        © {new Date().getFullYear()} Job Assistant. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}

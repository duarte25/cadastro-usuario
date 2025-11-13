import { Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-green-50 p-6 sm:p-12 md:p-24">
      <div className="text-center p-8 sm:p-10 rounded-xl bg-white shadow-lg border border-green-200 max-w-2xl transform transition-all duration-500 hover:scale-105">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-green-100 rounded-full">
            <Users className="w-12 h-12 text-green-700" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-4">
          Bem-vindo ao Sistema de Cadastro
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8">
          Gerencie seus usuários de forma simples e eficiente. Visualize, adicione e gerencie todos os cadastros com facilidade.
        </p>
        <Link href="/usuarios" className="inline-block bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
          Acessar Usuários
        </Link>
      </div>
    </main>
  );
}

import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-flex p-4 bg-yellow-100 rounded-full mb-6">
          <AlertTriangle className="h-12 w-12 text-yellow-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
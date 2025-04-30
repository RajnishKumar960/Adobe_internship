import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight } from 'lucide-react';

function Welcome() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-64px)] page-background bg-welcome">
      <div className="content-wrapper min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center backdrop-blur-sm bg-white/80 p-8 rounded-2xl shadow-xl">
          <div className="mb-8 animate-bounce">
            <div className="inline-flex p-4 bg-blue-100 rounded-full">
              <div className="p-3 bg-blue-600 rounded-full">
                <ArrowRight className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome {isAuthenticated ? user?.name : ""}
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            {isAuthenticated 
              ? "Pick up where you left off by visiting your dashboard." 
              : "Experience a seamless multi-page application with authentication."}
          </p>

          {isAuthenticated ? (
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
              <Link
                to="/dashboard"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
              <Link
                to="/login"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 bg-white hover:bg-gray-100 text-blue-600 font-medium rounded-lg border border-blue-200 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Welcome;
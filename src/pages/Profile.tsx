import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Edit, CheckCircle } from 'lucide-react';

function Profile() {
  const { user, logout } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const updatedUsers = users.map((u: any) => {
      if (u.id === user?.id) {
        return { ...u, name };
      }
      return u;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    if (user) {
      const updatedUser = { ...user, name };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    setSuccessMessage('Profile updated successfully!');
    setIsEditMode(false);
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] page-background bg-profile">
      <div className="content-wrapper min-h-[calc(100vh-64px)] p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-blue-100 rounded-full mb-4">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600 mt-1">Manage your account information</p>
          </div>
          
          {successMessage && (
            <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              {successMessage}
            </div>
          )}
          
          <div className="backdrop-blur-sm bg-white/90 rounded-xl shadow-lg overflow-hidden">
            {isEditMode ? (
              <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={user?.email}
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditMode(false);
                      setName(user?.name || '');
                    }}
                    className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Account Information</h2>
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Name</h3>
                    <p className="text-gray-900 mt-1">{user?.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="text-gray-900 mt-1">{user?.email}</p>
                  </div>
                </div>
                
                <div className="mt-8 pt-4 border-t border-gray-200">
                  <button
                    onClick={logout}
                    className="w-full py-2 px-4 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
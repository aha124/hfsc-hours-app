import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, signOut, isAuthenticated, loading } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="font-bold text-xl">HFSC Coach Hours</div>
          <div>
            {loading ? (
              <span>Loading...</span>
            ) : isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm hidden sm:inline">{user.email}</span>
                <button
                  onClick={signOut}
                  className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <span>Not signed in</span>
            )}
          </div>
        </nav>
      </header>
      <main className="flex-grow bg-gray-50">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} HFSC Coach Hours Tracker</p>
        </div>
      </footer>
    </div>
  );
} 
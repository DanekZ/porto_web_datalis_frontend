import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate("/admin");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg text-white placeholder-[#525252] text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Zidane<span className="text-blue-400">.</span>
          </h1>
          <p className="text-[#737373] text-sm mt-2">Admin Panel — Sign in to continue</p>
        </div>

        {/* Card */}
        <div className="bg-[#141414] border border-[#1f1f1f] rounded-2xl p-8">
          <h2 className="mb-6 text-lg font-bold text-white">Welcome back</h2>

          {error && <div className="px-4 py-3 mb-5 text-sm text-red-400 border rounded-lg bg-red-500/10 border-red-500/20">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-[#a3a3a3] mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@example.com" className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#a3a3a3] mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className={inputClass} />
            </div>

            <button type="submit" disabled={isLoading} className="w-full py-3 text-sm font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[#525252] text-xs mt-6">Portfolio Admin Panel © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default AdminLogin;

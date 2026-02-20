import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginData } from '../../store/slices/loginSlice';
import { init } from '@/services';
import { URL } from '@/api';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const SignIn: React.FC = () => {
  const [userName, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!userName || !password) {
      setError("Kullanıcı adı ve şifre zorunludur.");
      return;
    }

    try {
      setLoading(true);

      await dispatch(
        loginData({ data: { userName, password } })
      ).unwrap();

      init();
      navigate('/');
    } catch (err) {
      setError("Giriş başarısız. Bilgilerinizi kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={URL.replace("/api", "") + "/logo.png"}
            alt="Logo"
            className="h-12"
          />
        </div>

        <h2 className="text-2xl font-semibold text-center text-slate-800 mb-2">
          Giriş
        </h2>
        <p className="text-sm text-slate-500 text-center mb-8">
          Hesabınıza erişmek için bilgilerinizi giriniz
        </p>

        <form onSubmit={handleLogin} className="space-y-6">

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="kullanıcı adı"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Şifre
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="şifre"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>


          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-400">
          Dijital ERP 2026 © Tüm hakları saklıdır.
        </div>

      </div>
    </div>
  );
};

export default SignIn;

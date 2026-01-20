import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Logo from '../../images/logo/logo.svg';
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { loginData } from '../../store/slices/loginSlice'
import { init } from '@/services';
import { URL } from '@/api';
const SignIn: React.FC = () => {
  const [userName, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (userName && password) {
        dispatch(await loginData({ data: { userName, password } })).unwrap().then(() => {
          init();
          navigate('/');
        });
      } else {
        console.error('Invalid login response:');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="h-screen rounded-sm border border-stroke bg-white shadow-default">
      <div className="flex flex-wrap items-center h-screen">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <Link className="mb-5.5 inline-block" to="/">
              <img className="" src={URL+"/logo.png"}  alt="Logo" />
            </Link>
            <p className="2xl:px-20">
              Dijital ERP 2025 © Tüm hakları saklıdır.
            </p>
          </div>
        </div>
        <div className="w-full border-stroke xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black  sm:text-title-xl2">
              Giriş
            </h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black">
                  Kullanıcı Adı
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="kullanıcı adı"
                    value={userName}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none "
                  />
                  <span className="absolute right-4 top-4">
                    {/* <PersonOutlineOutlinedIcon sx={{ color: 'grey' }} /> */}
                  </span>
                </div>
              </div>
              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black">
                  Şifre
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                  />
                  <span className="absolute right-4 top-4">
                    {/* <LockOutlinedIcon sx={{ color: 'grey' }} /> */}
                  </span>
                </div>
              </div>
              <div className="mb-5">
                <input
                  type="submit"
                  value="Giriş"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-blue-500 p-4 text-white transition hover:bg-opacity-90"
                />
              </div>
              {/* <div className="mt-6 text-center">
                <p>
                  Üye değilseniz{' '}
                  <Link to="/auth/signup" className="text-blue-500">
                    Kayıt Olun...
                  </Link>
                </p>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
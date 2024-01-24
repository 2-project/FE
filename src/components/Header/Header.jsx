import React, { useEffect, useState } from 'react';
import './Header.css';
import mujiLogo from '../img/mujilogo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { localToken } from '../../utils/auth';

function Header() {
  const navigate = useNavigate();
  const [tokenState, setToken] = useState(null);
  const currentLocation = useLocation();

  useEffect(() => {
    setToken(localToken.get());
  }, []);

  const handleLoginOrLogOut = () => {
    if (tokenState) {
      localToken.remove();
      setToken(null);
    }
    navigate('/login');
  };

  // 아이콘 클릭 이벤트 핸들러
  // const handleNavigation = (path) => {
  //   if (path === '/order' && !tokenState) {
  //     navigate('/login');
  //   } else {
  //     navigate(path);
  //   }
  // };
  const handleNavigation = (path) => {
    navigate(path);
  };

  const isLoginPage = currentLocation.pathname === '/login'; // 'currentLocation' 변수 사용
  const iconStyle = isLoginPage ? { opacity: 0, pointerEvents: 'none' } : {};

  const iconsConfig = tokenState
    ? [
        { icon: IconItems[2].icon, label: '장바구니', path: '/cart' },
        { icon: IconItems[1].icon, label: '마이페이지', path: '/user' },
        {
          icon: IconItems[0].icon,
          label: '로그아웃',
          action: handleLoginOrLogOut,
        },
      ]
    : [
        {
          icon: IconItems[2].icon,
          label: '장바구니',
          action: () => navigate('/login'),
        },
        { icon: IconItems[1].icon, label: '주문배송', path: '/order' },
        { icon: IconItems[0].icon, label: '로그인', path: '/login' },
      ];

  return (
    <div className="min-h-screen">
      <header className="container mx-auto">
        <div className="header-content">
          <Link to="/">
            <img src={mujiLogo} alt="MUJI 로고" style={{ height: '50px' }} />
          </Link>
          <div className="search-bar">
            <div
              className="search-container"
              style={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <input
                type="text"
                id="search-input"
                style={{
                  flex: 1,
                  padding: '10px 40px 10px 10px',
                  border: '2px solid #ccc',
                  borderRadius: '5px',
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="search-icon"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '10px',
                  color: '#ccc',
                  cursor: 'pointer',
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
          </div>
          <div className="icons" style={iconStyle}>
            {iconsConfig.map((item, index) => (
              <div
                key={index}
                className="icon-item"
                onClick={() =>
                  item.action ? item.action() : handleNavigation(item.path)
                }
                style={{ cursor: 'pointer' }}
              >
                {item.icon()}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}
const focusSearchInput = () => {
  document.getElementById('search-input').focus();
};

const IconItems = [
  {
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
        />
      </svg>
    ),
    label: '로그인',
  },
  {
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    ),
    label: '주문배송',
  },
  {
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
    ),
    label: '장바구니',
  },
];

export default Header;

// src/components/icon/Icon.js
import React from 'react';

const icons = {
    AccountDetailIcon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="15" height="15" fill="currentColor">
          <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    InfoCircleIcon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="8" r="1" fill="currentColor"/>
        </svg>
    ),
    SuccessCircleIcon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
          <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 12a5 5 0 1 1 0-10A5 5 0 0 1 8 13zm3.354-7.854a.5.5 0 0 0-.708-.708L7.5 8.293 6.354 7.146a.5.5 0 0 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3.5-3.5z"/>
        </svg>
    ),
    DangerCircleIcon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
          <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 12a5 5 0 1 1 0-10A5 5 0 0 1 8 13zm3.354-7.354a.5.5 0 0 0-.708-.708L8 7.293 5.854 5.146a.5.5 0 1 0-.708.708L7.293 8 5.146 10.146a.5.5 0 1 0 .708.708L8 8.707l2.146 2.147a.5.5 0 0 0 .708-.708L8.707 8l2.147-2.146z"/>
        </svg>
    ),
    WarningCircleIcon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 22h20L12 2z" fill="transparent" stroke="black" strokeWidth="2"/>
          <circle cx="12" cy="18" r="1.5" fill="black"/>
          <path d="M12 9v6" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    ),
    SearchIcon: () => (
        <svg viewBox="0 0 1024 1024" fill="currentColor">
            <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
        </svg>
    ),
    CloseXIcon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 18" width="24" height="24">
          <path fill="currentColor" d="M12 10.586l-4.293-4.293-1.414 1.414L10.586 12l-4.293 4.293 1.414 1.414L12 13.414l4.293 4.293 1.414-1.414L13.414 12l4.293-4.293-1.414-1.414z" />
        </svg>
    ),
    LeftArrowIcon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
    ),
    RightArrowIcon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
    ),
    TrashIcon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M5 4H4V6H5V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V6H20V4H16.5L15.5 3H8.5L7.5 4H5ZM7 6H17V20H7V6ZM9 8V18H11V8H9ZM13 8V18H15V8H13Z" />
        </svg>
    ),
    EditIcon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M3 18V21H6L17.4 9.6L14.4 6.6L3 18ZM20.7 7.3C21.1 6.9 21.1 6.3 20.7 5.9L18.1 3.3C17.7 2.9 17.1 2.9 16.7 3.3L15 5L19 9L20.7 7.3Z" />
        </svg>
    ),
    SaveIcon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M17 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3ZM12 19C10.34 19 9 17.66 9 16C9 14.34 10.34 13 12 13C13.66 13 15 14.34 15 16C15 17.66 13.66 19 12 19ZM15 9H5V5H15V9Z" />
        </svg>
    ),
    CancelIcon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
        </svg>
    ),
    GridViewIcon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  width="24" height="24" fill="currentColor" >
          <path d="M5 5h4v4H5V5zm0 6h4v4H5v-4zm0 6h4v4H5v-4zm6-12h4v4h-4V5zm0 6h4v4h-4v-4zm0 6h4v4h-4v-4zm6-12h4v4h-4V5zm0 6h4v4h-4v-4zm0 6h4v4h-4v-4z" />
        </svg>
    ),
    RowViewIcon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 18" width="24" height="24" fill="currentColor" >
          <path d="M3 5h18v2H3V5zm0 7h18v-2H3v2zm0 5h18v-2H3v2z" />
        </svg>
    ),
    SunIcon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
            <path d="M12 1V3M12 21V23M1 12H3M21 12H23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
    MoonIcon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" fill="currentColor" >
           <path d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    AZAscIcon: () => (
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 40"fill="currentColor" >
        <text x="-12" y="32" fontSize="35">↑</text>
        <text x="13" y="18" fontSize="24">A</text>
        <text x="13" y="40" fontSize="24">Z</text>
      </svg>
    ),
    ZADescIcon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 40" fill="currentColor" >
        <text x="-12" y="32" fontSize="35">↓</text>
        <text x="13" y="18" fontSize="24">Z</text>
        <text x="13" y="40" fontSize="24">A</text>
      </svg>
    ),
    CalendarAscIcon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
        <rect x="2" y="4" width="20" height="18" rx="2" ry="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="7" y1="4" x2="7" y2="10" />
        <line x1="17" y1="4" x2="17" y2="10" />
        <path d="M12 19v-4" />
        <path d="M9 16l3-3 3 3" />
      </svg>
    ),
    CalendarDescIcon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
        <rect x="2" y="4" width="20" height="18" rx="2" ry="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="7" y1="4" x2="7" y2="10" />
        <line x1="17" y1="4" x2="17" y2="10" />
        <path d="M12 13v4" />
        <path d="M9 16l3 3 3-3" />
      </svg>
    ),
};

const Icon = ({ iconName, height = "24", width = "24", fill = "currentColor" }) => {
    const IconComponent = icons[iconName];

    return (
        <div style={{ display: 'inline-block', height, width }}>
            {IconComponent ? <IconComponent height={height} width={width} fill={fill} /> : null}
        </div>
    );
};

export default Icon;


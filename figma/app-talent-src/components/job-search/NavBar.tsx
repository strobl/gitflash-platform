import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav className="border-b-[color:var(--dark-dark\_6,#E7E9EC)] flex w-full items-stretch gap-5 overflow-hidden justify-between bg-white px-[17px] py-2.5 rounded-[8px_8px_0px_0px] border-b border-solid">
      <div className="flex items-center gap-2">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/daf6dadae7779963acf5918fed94abca56ec2e8b?placeholderIfAbsent=true"
          className="aspect-[11/14] object-contain w-[11px] fill-[#0A2540] self-stretch shrink-0 my-auto"
          alt="Back icon"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/bd024269d063aa9e9d85e5c088cb24d1bafe63df?placeholderIfAbsent=true"
          className="aspect-[5.08] object-contain w-[61px] fill-[#0A2540] self-stretch shrink-0 my-auto"
          alt="Logo"
        />
      </div>
      <div className="flex items-center gap-2">
        <button aria-label="Menu">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/8687dce1a9c017e8738489dc11fe4a03a1394544?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-6 self-stretch my-auto"
            alt="Menu icon"
          />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

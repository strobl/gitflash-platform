import React from "react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active }) => {
  return (
    <div 
      className={`flex flex-col items-center gap-0.5 w-[52px] ${active ? 'border border-[#0A2540]' : ''}`}
    >
      <div>{icon}</div>
      <div className={`text-[9px] ${active ? 'text-[#0A2540]' : 'text-[#6C7C8C]'}`}>{label}</div>
    </div>
  );
};

const BottomNavigation: React.FC = () => {
  return (
    <>
      <div className="flex justify-between items-center w-full h-[66px] bg-white shadow-[0px_-5px_10px_0px_rgba(0,49,77,0.10)] px-4 rounded-[0px_0px_12px_12px]">
        <NavItem
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[20px] h-[20px]"
            >
              <path
                d="M10.8333 15.8333H15.8333V8.31513L10 3.77809L4.16667 8.31513V15.8333H9.16667V10.8333H10.8333V15.8333ZM17.5 16.6667C17.5 17.1269 17.1269 17.5 16.6667 17.5H3.33333C2.8731 17.5 2.5 17.1269 2.5 16.6667V7.90756C2.5 7.6504 2.61873 7.40764 2.82172 7.24977L9.48842 2.06458C9.78933 1.83053 10.2107 1.83053 10.5116 2.06458L17.1782 7.24977C17.3812 7.40764 17.5 7.6504 17.5 7.90756V16.6667Z"
                fill="#6C7C8C"
              ></path>
            </svg>
          }
          label="Startseite"
        />
        <NavItem
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[20px] h-[20px]"
            >
              <path
                d="M17.5 6.66669V17.4944C17.5 17.9584 17.1293 18.3334 16.6722 18.3334H3.32783C2.87079 18.3334 2.5 17.9634 2.5 17.5069V2.49319C2.5 2.04611 2.87392 1.66669 3.33518 1.66669H12.4973L17.5 6.66669ZM15.8333 7.50002H11.6667V3.33335H4.16667V16.6667H15.8333V7.50002Z"
                fill="#6C7C8C"
              ></path>
            </svg>
          }
          label="Lebenslauf"
        />
        <NavItem
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[20px] h-[20px]"
            >
              <path
                d="M10.8335 5.00002V3.33335H4.16683V1.66669H12.5002V5.00002H13.3335C13.7937 5.00002 14.1668 5.37312 14.1668 5.83335V7.66669L18.5112 4.62561C18.6997 4.49365 18.9596 4.5395 19.0915 4.72802C19.1405 4.79805 19.1668 4.88147 19.1668 4.96696V15.0331C19.1668 15.2632 18.9802 15.4498 18.7502 15.4498C18.6647 15.4498 18.5812 15.4234 18.5112 15.3744L14.1668 12.3334V15.8334C14.1668 16.2936 13.7937 16.6667 13.3335 16.6667H1.66683C1.2066 16.6667 0.833496 16.2936 0.833496 15.8334V5.83335C0.833496 5.37312 1.2066 5.00002 1.66683 5.00002H10.8335ZM4.16683 8.33335V10H5.8335V8.33335H4.16683Z"
                fill="#0A2540"
              ></path>
            </svg>
          }
          label="Interview"
          active={true}
        />
        <NavItem
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[20px] h-[20px]"
            >
              <path
                d="M15.8333 8.33335H16.6667C17.1269 8.33335 17.5 8.70644 17.5 9.16669V17.5C17.5 17.9603 17.1269 18.3334 16.6667 18.3334H3.33333C2.8731 18.3334 2.5 17.9603 2.5 17.5V9.16669C2.5 8.70644 2.8731 8.33335 3.33333 8.33335H4.16667V7.50002C4.16667 4.27836 6.77834 1.66669 10 1.66669C13.2217 1.66669 15.8333 4.27836 15.8333 7.50002V8.33335ZM4.16667 10V16.6667H15.8333V10H4.16667ZM9.16667 11.6667H10.8333V15H9.16667V11.6667ZM14.1667 8.33335V7.50002C14.1667 5.19884 12.3012 3.33335 10 3.33335C7.69882 3.33335 5.83333 5.19884 5.83333 7.50002V8.33335H14.1667Z"
                fill="#6C7C8C"
              ></path>
            </svg>
          }
          label="Zahlungen"
        />
        <NavItem
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[20px] h-[20px]"
            >
              <path
                d="M15.0257 13.8474L18.5946 17.4163L17.4161 18.5948L13.8472 15.0259C12.5639 16.0525 10.9365 16.6667 9.1665 16.6667C5.0265 16.6667 1.6665 13.3067 1.6665 9.16669C1.6665 5.02669 5.0265 1.66669 9.1665 1.66669C13.3065 1.66669 16.6665 5.02669 16.6665 9.16669C16.6665 10.9367 16.0523 12.5641 15.0257 13.8474ZM13.3538 13.229C14.3728 12.1789 14.9998 10.7464 14.9998 9.16669C14.9998 5.94377 12.3894 3.33335 9.1665 3.33335C5.94359 3.33335 3.33317 5.94377 3.33317 9.16669C3.33317 12.3896 5.94359 15 9.1665 15C10.7462 15 12.1787 14.3729 13.2288 13.3539L13.3538 13.229Z"
                fill="#0A2540"
              ></path>
            </svg>
          }
          label="Erkunden"
        />
      </div>
      <div className="flex justify-center items-center w-full h-[18px] bg-[linear-gradient(180deg,rgba(36,36,47,0.00)_0%,rgba(36,36,47,0.00)_50%)]">
        <div className="w-[72px] h-0.5 bg-[#9DA8B3] rounded-lg" />
      </div>
    </>
  );
};

export default BottomNavigation;

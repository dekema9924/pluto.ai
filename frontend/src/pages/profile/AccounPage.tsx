
import { useModal } from "../../context/modalContext";
import { useState } from "react";
import Profile from "./Profile";
import Security from './Security';
import Billing from './Billing';


const AccountPage = () => {
  const { toggleIsProfile } = useModal();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'billing'>('profile');

  // Render the selected component
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />;
      case 'security':
        return <Security />;
      case 'billing':
        return <Billing />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[700px] bg-gray-50 text-black w-full max-w-[900px] md:w-11/12 mx-auto rounded-lg shadow-lg overflow-hidden">
      {/* Mobile Top Bar */}
      <div className="flex md:hidden items-center justify-between p-4 border-b border-gray-300 w-full">
        <h2 className="text-lg font-semibold">Account</h2>
        <button
          onClick={toggleIsProfile}
          className="text-2xl text-gray-500 hover:text-black"
        >
          ✕
        </button>
      </div>

      {/* Sidebar for desktop and mobile */}
      <aside className="w-full md:w-64  border-b border-gray-300 px-6 py-6 md:py-8 rounded-none md:rounded-l-lg">
        <h2 className="text-xl font-semibold mb-6 hidden md:block">Account</h2>
        <ul className="flex md:flex-col justify-around md:space-y-4 text-sm md:text-base">
          <li
            onClick={() => setActiveTab('profile')}
            className={`cursor-pointer ${activeTab === 'profile' ? 'text-black font-semibold' : 'text-gray-500'
              }`}
          >
            Profile
          </li>
          <li
            onClick={() => setActiveTab('security')}
            className={`cursor-pointer ${activeTab === 'security' ? 'text-black font-semibold' : 'text-gray-500'
              }`}
          >
            Security
          </li>
          <li
            onClick={() => setActiveTab('billing')}
            className={`cursor-pointer ${activeTab === 'billing' ? 'text-black font-semibold' : 'text-gray-500'
              }`}
          >
            Billing
          </li>

        </ul>
      </aside>

      {/* Profile Details */}
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        {renderContent()}
      </div>

    </div>
  );
};

export default AccountPage;

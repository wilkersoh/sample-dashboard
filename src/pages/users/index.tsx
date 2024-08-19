import { UserCreationForm } from "@/components/UserCreationForm";
import { EditUserForm } from "@/components/UserEditForm";
import { UserTable } from "@/components/UserTable";
import { useUserStore } from "@/providers/user/user-store-provider";
import {
  getCurrentActiveTabAction,
  getSelectedUserAction,
  setCurrentActiveTabAction,
} from "@/stores/user/user-store";

const UserListDashboard = () => {
  const tabs = ["View", "Edit", "Create"];

  // 3 tab
  // 1. view tab
  //  1.1 can edit
  //  1.2 can delete
  // 2. edit tab
  //    2.1 can update new profile image,
  //    2.2 truncated name if length more than 25
  //    2.3 allow positive number with decimal
  // 3. add new user tab
  const setCurrentActiveTab = useUserStore(setCurrentActiveTabAction);
  const currentActiveTab = useUserStore(getCurrentActiveTabAction);
  const selectedUser = useUserStore(getSelectedUserAction);

  const handleTabChange = (tab: string) => {
    setCurrentActiveTab(tab);
  };

  const renderSelectedTabView = () => {
    return (
      <div className="bg-white shadow-md rounded p-4 text-black">
        {currentActiveTab.toLowerCase() === "view" && <UserTable />}
        {currentActiveTab.toLowerCase() === "create" && <UserCreationForm />}
        {currentActiveTab.toLowerCase() === "edit" && <EditUserForm />}
      </div>
    );
  };

  const renderTabs = () => {
    return (
      <div className="flex mb-4">
        {tabs.map((tab) => {
          const isDisabledEdit = tab.toLowerCase() === "edit" && !selectedUser;
          return (
            <button
              key={tab}
              disabled={isDisabledEdit}
              className="mr-2 px-2 py-2 rounded first:pl-0 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => handleTabChange(tab)}
            >
              {tab.charAt(0) + tab.slice(1)} User
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashbaord</h1>
      {renderTabs()}
      {renderSelectedTabView()}
    </div>
  );
};

export default UserListDashboard;

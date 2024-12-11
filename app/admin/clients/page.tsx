import { ClientsList } from "@/app/admin/_components/ClientsList";
import Header from "@/app/admin/_components/Header";

const Clients = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="مراجعان" />
      <div className="w-full flex flex-col p-8">
        <div className="w-full h-full flex flex-col bg-white rounded-md shadow-md p-4">
          <ClientsList />
        </div>
      </div>
    </div>
  );
};

export default Clients;

import Header from "@/app/admin/_components/Header";
import { PaymentsList } from "@/app/admin/_components/PaymentsList";

const Payments = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="پرداخت ها" />
      <div className="w-full flex flex-col p-8">
        <div className="w-full h-full flex flex-col bg-white rounded-md shadow-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">پرداخت ها</h2>
          </div>
          <PaymentsList />
        </div>
      </div>
    </div>
  );
};

export default Payments;

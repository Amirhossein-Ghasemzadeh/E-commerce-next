import { BillboardClient } from "./components/client";

const BillboardPage = () => {
  return (
    <div className='flex-col'>
      <div className='flex space-y-4 p-8 pt-6 '>
        <BillboardClient />
      </div>
    </div>
  );
};

export default BillboardPage;

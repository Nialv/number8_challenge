import React from "react";
import CreateEmployeeForm from "@components/organisms/CreateEmployeeForm";
import Header from "@components/layouts/Header";
import { Footer } from "@components/layouts/Footer";
import EmployeeList from "@components/organisms/EmployeeList";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <CreateEmployeeForm />
          </div>
          <div className="md:col-span-2">
            <EmployeeList />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

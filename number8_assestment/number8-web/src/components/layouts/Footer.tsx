import logo from "@assets/number-8-logo.svg";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <img src={logo} alt="Company Logo" className="h-8" />
      </div>
    </footer>
  );
};

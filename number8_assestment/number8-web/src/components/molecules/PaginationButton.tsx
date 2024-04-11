import React from "react";
import Button from "@components/atoms/Button";
import { PaginationProps } from "@interfaces/pagination";

const PaginationButton: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  return (
    <div className="flex justify-center">
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          isPrimary={currentPage === index + 1}
          style={{ marginRight: index === totalPages - 1 ? 0 : "0.5rem" }}
        >
          {index + 1}
        </Button>
      ))}
    </div>
  );
};

export default PaginationButton;

import { ChangeEvent, FC, FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

type PropsType = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchBar: FC<PropsType> = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="py-10 p-4">
      <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
        <div className="flex items-center border w-full p-2 rounded-md bg-white shadow-sm">
          <FaSearch className="text-gray-400 ml-3" />
          <input
            type="text"
            placeholder="Search by food name or category"
            aria-label="Search bar"
            value={searchTerm}
            onChange={handleChange}
            className={`w-full p-2 pl-3 focus:outline-none ${searchTerm ? 'border-blue-500' : ''}`}
          />
        </div>
      </form>
    </div>
  );
};

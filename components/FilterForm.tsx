import Link from 'next/link';
import React, { useState } from 'react';
import months from '../data/months';

interface SelectGroupProps {
  label: string;
  value?: string | number;
  labels: string[];
  values: (string | number)[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectGroup: React.FC<SelectGroupProps> = ({
  label,
  value,
  labels,
  values,
  onChange,
}) => {
  return (
    <div className="flex space-x-2 items-center  text-gray-600">
      <span className="text-lg capitalize">{label}</span>
      <select
        className="border border-gray-200 hover:border-gray-400 focus:border-gray-400 px-2 py-2 rounded-lg"
        value={value}
        onChange={onChange}
      >
        {labels.map((label, index) => (
          <option key={index} value={values[index]}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

const nextTenYears = (() => {
  const curYear = new Date().getFullYear();
  const result = [];

  for (let i = 0; i <= 9; i++) {
    result.push(curYear + i);
  }

  return result;
})();

const FilterForm = () => {
  const [year, setYear] = useState(nextTenYears[0]);
  const [month, setMonth] = useState(0);

  return (
    <form className="flex flex-col sm:flex-row items-center w-max mx-auto p-4 space-y-4 sm:space-y-0 sm:space-x-4  border border-gray-200 rounded-md">
      <SelectGroup
        label="year"
        value={year}
        onChange={e => setYear(+e.target.value)}
        labels={nextTenYears.map(year => String(year))}
        values={nextTenYears}
      />
      <SelectGroup
        label="month"
        value={month}
        onChange={e => setMonth(+e.target.value)}
        labels={months}
        values={Array.from({ length: 12 }, (_, i) => String(i))}
      />
      <Link href={`events/${year}/${month}`}>
        <a className="btn">Find Events</a>
      </Link>
    </form>
  );
};

export default FilterForm;

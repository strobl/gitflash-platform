import React from 'react';
import Header from './Header';
import JobListingsHeader from './JobListingsHeader';
import SearchBar from './SearchBar';
import FilterTags from './FilterTags';
import EmptyState from './EmptyState';

const JobListings: React.FC = () => {
  return (
    <div className="flex flex-col items-start w-full bg-white">
      <Header />
      <div className="flex flex-col gap-4 w-full bg-white px-4 py-8 max-sm:px-3 max-sm:py-6">
        <JobListingsHeader />
        <SearchBar />
        <FilterTags />
      </div>
      <div className="flex flex-col items-start gap-6 w-full bg-white pt-0 pb-8 px-4 max-sm:pt-0 max-sm:pb-6 max-sm:px-3">
        <EmptyState />
      </div>
    </div>
  );
};

export default JobListings;

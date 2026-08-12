'use client';

import { useMemo, useState } from 'react';
import AdminBookedApartment from './AdminBookedApartment';
import { FaChevronDown } from 'react-icons/fa';

const BoookingsFilter = ({ bookings }) => {
  const [apartmentFilter, setApartmentFilter] = useState('');
  const [confirmed, setConfirmed] = useState('all');
  const [search, setSearch] = useState('');

  // Create unique apartment names
  const apartmentNames = useMemo(() => {
    return [...new Set(bookings.map((booking) => booking.apartmentName))];
  }, [bookings]);

  // Filter bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const apartmentMatch =
        apartmentFilter === '' || booking.apartmentName === apartmentFilter;

      const confirmedMatch =
        confirmed === 'all'
          ? true
          : confirmed === 'true'
            ? booking.confirmed
            : !booking.confirmed;

      const searchMatch = booking.userName
        .toLowerCase()
        .includes(search.toLowerCase());

      return apartmentMatch && confirmedMatch && searchMatch;
    });
  }, [bookings, apartmentFilter, confirmed, search]);

  return (
    <div className='space-y-6'>
      {/* Filters */}
      <div className='p-4 mt-4 grid grid-cols-1 gap-4 md:grid-cols-3 justify-between justify-items-center'>
        {/* Apartment */}
        {/* Apartment */}
        <div className='relative w-full'>
          <select
            value={apartmentFilter}
            onChange={(e) => setApartmentFilter(e.target.value)}
            className='w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'
          >
            <option value=''>All apartments</option>
            {apartmentNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <FaChevronDown
            size={12}
            className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
          />
        </div>
        {/* Confirmed */}
        <div className='relative w-full'>
          <select
            value={confirmed}
            onChange={(e) => setConfirmed(e.target.value)}
            className='w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'
          >
            <option value='all'>All</option>
            <option value='true'>Confirmed</option>
            <option value='false'>Pending</option>
          </select>
          <FaChevronDown
            size={12}
            className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
          />
        </div>
        {/* Search guest */}
        <div className=' w-full'>
          <input
            type='text'
            placeholder='Search guest...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'
          />
        </div>
      </div>
      <div className='space-y-4'>
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <AdminBookedApartment key={booking.id} booking={booking} />
          ))
        ) : (
          <p className='text-center text-slate-600'>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default BoookingsFilter;

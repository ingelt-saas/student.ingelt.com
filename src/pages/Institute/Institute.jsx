import React from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/shared/SearchBar/SearchBar';
import Notes from '../../components/Institute/Notes';
import Assignments from '../../components/Institute/Assignments';

const Institute = () => {

    const [search, setSearch] = useSearchParams();
    const page = search.get('page');
    const [searchQuery, setSearchQuery] = useState('');

    const searchForm = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.search.value);
    }

    return (
        <div>
            <div className='bg-white rounded-lg shadow-xl max-sm:px-2 px-5 py-10'>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-3xl font-semibold text-[#0C3C82]'>Institute</h1>
                    <p className='text-[#00000099]'>Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor.  </p>
                </div>
            </div>
            <div className='flex max-sm:flex-col max-sm:gap-y-3 justify-between items-center mt-10'>
                <div className="flex items-end justify-start">
                    <button onClick={() => setSearch({ 'page': 'assignments' })}
                        className={
                            `duration-200 transition-none ease-in ${(page === 'assignments' || !page) ? 'border-1 py-3 px-5 md:px-8 font-semibold text-[#1B3B7D] border-[#ECECEC] bg-white border-b-0 rounded-t-xl' : 'bg-[#F3F3F3] py-2 px-2 md:px-5 text-sm'
                            }`
                        }>Assignments</button>
                    <button onClick={() => setSearch({ 'page': 'notes' })}
                        className={
                            `duration-200 transition-none ease-in ${page === 'notes' ? 'border-1 py-3 px-5 md:px-8 font-semibold text-[#1B3B7D] border-[#ECECEC] bg-white border-b-0 rounded-t-xl' : 'bg-[#F3F3F3] py-2 px-2 md:px-5 text-sm'
                            }`
                        }>Notes</button>
                </div>
                <div className="flex items-end justify-end pt-5 sm:pt-0 md:pl-16 xl:pl-0">
                    <SearchBar handleSubmit={searchForm} />
                </div>
            </div>

            {page === 'notes' ?
                <Notes searchQuery={searchQuery} /> :
                <Assignments searchQuery={searchQuery} />
            }

        </div>
    );
}

export default Institute;

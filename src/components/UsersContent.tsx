import React from 'react';
import { User } from 'lucide-react';

interface Member {
  name: string;
  gender: 'male' | 'female';
}

interface Department {
  title: string;
  members: Member[];
}

const DEPARTMENTS: Department[] = [
  {
    title: 'QUALITY CONTROL DEPARTEMENT',
    members: [
      { name: 'Cay', gender: 'male' },
      { name: 'Konan', gender: 'male' },
    ],
  },
  {
    title: 'TEKS MISA DEPARTEMENT',
    members: [
      { name: 'Galan', gender: 'male' },
      { name: 'Joko', gender: 'male' },
      { name: 'Agnes', gender: 'female' },
      { name: 'Arya', gender: 'male' },
    ],
  },
  {
    title: 'PANDUAN MISA DEPARTEMENT',
    members: [
      { name: 'Ale', gender: 'male' },
      { name: 'Richard', gender: 'male' },
    ],
  },
];

export const UsersContent: React.FC = () => {
  return (
    <div className="space-y-10 relative max-w-5xl mx-auto flex flex-col items-center">
      {/* Top Title: TEXT DIVISION */}
      <div className="py-2 text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-black tracking-wider text-white uppercase drop-shadow-md">
          TEXT DIVISION
        </h2>
        <div className="h-1 w-24 bg-indigo-500 mx-auto rounded-full" />
      </div>

      {/* Departments */}
      <div className="w-full space-y-10">
        {DEPARTMENTS.map((dept) => (
          <div key={dept.title} className="space-y-6 flex flex-col items-center">
            {/* Badge Divider Header */}
            <div className="flex justify-center">
              <div className="px-6 md:px-8 py-2.5 rounded-xl bg-[#161616] border border-white/15 text-xs md:text-sm font-extrabold tracking-widest text-indigo-400 uppercase shadow-lg shadow-black/40 ring-1 ring-white/5 text-center">
                {dept.title}
              </div>
            </div>

            {/* User Cards Container Centered in 2 Columns (2 profiles per line) */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-xs sm:max-w-md mx-auto justify-items-center">
              {dept.members.map((member) => {
                const isFemale = member.gender === 'female';
                return (
                  <div
                    key={member.name}
                    className="group flex flex-col items-center justify-center w-36 sm:w-48 rounded-2xl border border-white/10 bg-[#161616] p-5 sm:p-6 shadow-xl transition-all hover:border-white/20 hover:bg-[#1a1a1a] text-center space-y-4 relative overflow-hidden shrink-0"
                  >
                    {/* Circle with User Icon */}
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-full border-2 transition-transform group-hover:scale-105 ${
                        isFemale
                          ? 'border-pink-500 bg-pink-500/10 text-pink-400 shadow-md shadow-pink-500/20'
                          : 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-md shadow-blue-500/20'
                      }`}
                    >
                      <User className="h-8 w-8" />
                    </div>

                    {/* Name in CAPSLOCK */}
                    <span className="text-sm md:text-base font-extrabold tracking-wider text-white uppercase">
                      {member.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

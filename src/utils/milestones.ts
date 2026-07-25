export interface MilestoneTask {
  id: string;
  title: string;
  category: string;
  active: boolean;
}

export function getActiveMilestones(now: Date = new Date()): MilestoneTask[] {
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const dateNum = now.getDate(); // 1 - 31
  const month = now.getMonth(); // 0 - 11
  const year = now.getFullYear();

  // Helper: Get days in current month
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

  // 1. Teks Misa Harian Senin (Bahasa Jawa)
  // Displayed on Sunday, removed on Tuesday -> Active Sun(0), Mon(1)
  const isTeksHarianSeninJawa = day === 0 || day === 1;

  // 2. Teks Misa Harian Jumat (Bahasa Indonesia)
  // Displayed on Sunday, removed on Saturday -> Active Sun(0) through Fri(5)
  const isTeksHarianJumatIndo = day >= 0 && day <= 5;

  // 3. Teks Misa Mingguan (Bahasa Indonesia)
  // Displayed on Monday, removed on Saturday -> Active Mon(1) through Fri(5)
  const isTeksMingguanIndo = day >= 1 && day <= 5;

  // 4. Teks Misa Mingguan (Bahasa Jawa)
  // Displayed on Monday, removed on Sunday -> Active Mon(1) through Sat(6)
  const isTeksMingguanJawa = day >= 1 && day <= 6;

  // 5. Teks Misa Jumat Pertama
  // Displayed on last Sunday of the month, remove on Saturday (after First Friday)
  let lastSundayDate = daysInCurrentMonth;
  while (new Date(year, month, lastSundayDate).getDay() !== 0) {
    lastSundayDate--;
  }

  // Find First Friday of current month
  let firstFridayDate = 1;
  while (new Date(year, month, firstFridayDate).getDay() !== 5) {
    firstFridayDate++;
  }
  const saturdayAfterFirstFriday = firstFridayDate + 1;

  let isTeksJumatPertama = false;
  if (dateNum >= lastSundayDate) {
    isTeksJumatPertama = true;
  } else if (dateNum <= saturdayAfterFirstFriday) {
    isTeksJumatPertama = true;
  }

  // 6 - 9. Panduan Misa items (displayed a week before month change, up to 1 week after new month start)
  const isPanduanMonthChange =
    dateNum >= daysInCurrentMonth - 6 || dateNum <= 7;

  // 10. Pengumuman Misa (display on Saturday, remove on Sunday -> Active Sat(6))
  const isPengumumanMisa = day === 6;

  const allTasks: MilestoneTask[] = [
    {
      id: 'teks-harian-senin-jawa',
      title: 'Teks Misa Harian Senin (Bahasa Jawa)',
      category: 'Teks Misa',
      active: isTeksHarianSeninJawa,
    },
    {
      id: 'teks-harian-jumat-indo',
      title: 'Teks Misa Harian Jumat (Bahasa Indonesia)',
      category: 'Teks Misa',
      active: isTeksHarianJumatIndo,
    },
    {
      id: 'teks-mingguan-indo',
      title: 'Teks Misa Mingguan (Bahasa Indonesia)',
      category: 'Teks Misa',
      active: isTeksMingguanIndo,
    },
    {
      id: 'teks-mingguan-jawa',
      title: 'Teks Misa Mingguan (Bahasa Jawa)',
      category: 'Teks Misa',
      active: isTeksMingguanJawa,
    },
    {
      id: 'teks-jumat-pertama',
      title: 'Teks Misa Jumat Pertama',
      category: 'Teks Misa',
      active: isTeksJumatPertama,
    },
    {
      id: 'panduan-harian-jawa',
      title: 'Panduan Misa Harian Bahasa Jawa',
      category: 'Panduan Misa',
      active: isPanduanMonthChange,
    },
    {
      id: 'panduan-harian-indo',
      title: 'Panduan Misa Harian Bahasa Indonesia',
      category: 'Panduan Misa',
      active: isPanduanMonthChange,
    },
    {
      id: 'panduan-mingguan-jawa',
      title: 'Panduan Misa Mingguan Bahasa Jawa',
      category: 'Panduan Misa',
      active: isPanduanMonthChange,
    },
    {
      id: 'panduan-mingguan-indo',
      title: 'Panduan Misa Mingguan Bahasa Indonesia',
      category: 'Panduan Misa',
      active: isPanduanMonthChange,
    },
    {
      id: 'pengumuman-misa',
      title: 'Pengumuman Misa',
      category: 'Pengumuman',
      active: isPengumumanMisa,
    },
  ];

  return allTasks.filter((task) => task.active);
}

/**
 * All editable homepage content lives here.
 * Replace the placeholder text and links with your own information.
 */
export const home = {
  name: 'Yuxuan Zheng',
  introduction: [
    [
      { text: 'I am currently an undergraduate student majoring in Robotics Engineering at the ' },
      {
        text: 'Southern University of Science and Technology (SUSTech)',
        href: 'https://www.sustech.edu.cn/en/'
      },
      { text: ', under the academic supervision of ' },
      {
        text: 'Prof. Boyu Zhou',
        href: 'https://mee.sustech.edu.cn/jiaozhiyuangong/3552.html'
      },
      { text: '. My primary research interests include robotics, computer vision, and autonomous navigation for unmanned aerial vehicles (UAVs).' }
    ],
    [
      { text: 'I currently serve as the Head of the Algorithm Group at the ARES Robotics Club, where I lead a team of students in developing robotic algorithms and preparing for the ABU Robocon 2027.' }
    ]
  ],
  links: [
    { label: 'Email', href: 'mailto:gracekite2155173747@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/BetterOIer' }
  ],
  works: [
    {
      title: 'Chinese Chess',
      authors: 'Yuxuan Zheng and collaborators',
      venue: 'SUSTech CS109 · Fall 2025',
      links: [
        { label: 'code', href: 'https://github.com/BetterOIer/ChineseChess' }
      ],
      description: 'A full-featured Chinese chess game built with Java Swing, featuring complete move validation, SQLite-backed accounts and game archives, replay support, responsive board rendering, and UDP-based LAN multiplayer.'
    },
    {
      title: 'Google Dino',
      authors: 'Yuxuan Zheng',
      venue: 'Personal Project · 2023',
      links: [
        { label: 'code', href: 'https://github.com/BetterOIer/GoogleDino' }
      ],
      description: 'A Python/Pygame recreation of the Chrome Dino runner, organized into modular systems for the dinosaur, obstacles, flying enemies, backgrounds, clouds, controls, and scoring.'
    }
  ],
  experience: [
    {
      title: 'Research Assistant',
      organization: 'STAR Lab, SUSTech',
      detail: 'Researching optimization methods for vision-language-action (VLA) models under the supervision of Prof. Boyu Zhou.',
      date: 'July 2026 ~ Present'
    },
    {
      title: 'Algorithm Team Member for Robocon 2026',
      organization: 'ARES Team, SUSTech',
      detail: 'Responsible for robot action planning, autonomous system design, and serving as the R2 robot operator.',
      date: '2025 ~ 2026'
    }
  ],
  awards: [
    {
      title: 'Robocon 2026 National Competition — \"Kung Fu Quest\" Main Event',
      detail: 'Second Prize',
      date: '2026.7'
    },
  ]
}

export default home

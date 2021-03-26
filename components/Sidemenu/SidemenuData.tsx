import { MdHome } from 'react-icons/md';
import { GiWool, GiSheep } from 'react-icons/gi';
import { IoMdFilm } from 'react-icons/io';

const SidemenuData = [
  {
    title: 'Inicio',
    icon: <MdHome />,
    path: '/',
  },
  {
    title: 'Patrones',
    icon: <GiWool />,
    path: '/patterns',
  },
  {
    title: 'Videos',
    icon: <IoMdFilm />,
    path: '/videos',
  },
  {
    title: 'Sobre mí',
    icon: <GiSheep />,
    path: '/about',
  },
];

export default SidemenuData;

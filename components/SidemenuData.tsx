import { MdHome } from 'react-icons/md';
import { GiWool, GiSheep } from 'react-icons/gi';
import { IoMdFilm } from 'react-icons/io';

const SidemenuData = [
  {
    text: 'Inicio',
    icon: <MdHome />,
    path: '/',
  },
  {
    text: 'Patrones',
    icon: <GiWool />,
    path: '/patterns',
  },
  {
    text: 'Videos',
    icon: <IoMdFilm />,
    path: '/videos',
  },
  {
    text: 'Sobre mí',
    icon: <GiSheep />,
    path: '/about',
  },
];

export default SidemenuData;

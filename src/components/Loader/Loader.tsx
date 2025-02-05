import load from '../../public/images/load.svg';
import style from './Loader.module.scss';
import Image from 'next/image';
const Loader = () => {
  return (
    <div className={style.load}>
      <Image
        width="121"
        height="130"
        src={load}
        alt="Loading"
        className={style.image}
      />
    </div>
  );
};

export default Loader;

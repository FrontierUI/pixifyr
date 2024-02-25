import Image from 'next/image';
import Link from 'next/link';

import { navLinks } from '@/constants';
import { getAllImages } from '@/lib/actions/image.actions';
import { Collection } from '@/components/shared/Collection';

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;

  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery });

  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision with Pixifyr
        </h1>

        <ul className="w-full gap-20 flex-center">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              href={link.route}
              key={link.route}
              className="gap-2 flex-col flex-center"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  );
};

export default Home;

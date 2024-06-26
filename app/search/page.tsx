import getBooksByTitle from "@/actions/getBooksByTitle";
import getAudiobooks from "@/actions/getAudiobooks";
import getChapters from "@/actions/getChapters";

import SearchInput from "@/components/SearchInput";
import Header from "@/components/Header";

import SearchContent from "./components/SearchContent";

export const revalidate = 0;

interface SearchProps {
  searchParams: { denumire: string }
};

const Search = async ({ searchParams }: SearchProps) => {
  const books = await getBooksByTitle(searchParams.denumire);
  const audiobooks = await getAudiobooks();
  const chapters = await getChapters();

  return (
    <div
      className="
        bg-neutral-900
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto
      "
    >
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Caută
          </h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent books={books} chapters={chapters} audiobooks={audiobooks}/>
    </div>
  );
}

export default Search;
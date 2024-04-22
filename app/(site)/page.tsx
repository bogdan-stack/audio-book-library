
import getBooks from "@/actions/getBooks";
import getAudiobooks from "@/actions/getAudiobooks";
import getChapters from "@/actions/getChapters";
import Header from "@/components/Header";

import PageContent from "./components/PageContent";
import WelcomeMessage from "./components/WelcomeMessage";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/HeroCard"


export const revalidate = 0;


export default async function Home() {
  const books = await getBooks();
  const audiobooks = await getAudiobooks();
  const chapters = await getChapters();


  return (
   <div className="
   bg-neutral-900
   rounded-lg
   h-full
   w-full
   overflow-hidden
   overflow-y-auto
   ">
    <Header>

    <div className="mb-2">
      <WelcomeMessage />
      <div
      className="
      grid
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-3
      2xl:grid-cols-4
      gap-3
      mt-4
      "
      >

        <Card>
          <div className="flex justify-center items-center">
          <CardContent className=" justify-center">
            <img
            src="/images/heraldica.png"
            width={64}
            height={64}
            />
          </CardContent>
          <CardHeader>
            <CardTitle className=" font-medium ">Platforma Audiobook FAR</CardTitle>
            <CardDescription>Ascultă, învață, luptă!</CardDescription>
          </CardHeader>
          
          </div>
        </Card>
      </div>
    </div>
    </Header>
    <div className="
    mt-2
    mb-7
    px-6
    ">
      <div className="
      flex justify-between
      items-center
      ">
        <h1 className="text-white text-2xl font-semibold">
          Cele mai noi Audiobook-uri
        </h1>
      </div>
      <PageContent books={books} audiobooks={audiobooks} chapters={chapters} />
    </div>
   </div>
  )
}

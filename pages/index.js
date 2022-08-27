import ArticlePreview from "../components/article_preview";

export default function Home() {
  return (
    <>
      <div className="mt-40 md:container md:mx-auto md:text-center md:justify-center" >
        <p className="text-5xl">Software Engineer using <b className="underline decoration-pink-500">PHP</b> and <b className="underline decoration-pink-500">GO</b>.</p>
          <p className="mt-10 w-1/3 mx-auto">
            I’m Diar, an software-engineer based in Berlin. I like to create software using different architectural patterns.<br/>
            I used to work with <a className="underline decoration-sky-500">PHP </a>
             now I started moving into <a className="underline decoration-pink-500">Go</a>.
          </p>
      </div>
      <div className="md:container md:mx-auto">
      <div className="">
        <div className="flex flex-wrap pt-12 -mx-6">
            <ArticlePreview />
        </div>
      </div>
      </div>
    </>
)
}

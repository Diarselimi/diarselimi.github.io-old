import ArticlePreview from "../components/article_preview";
import fs from 'fs';
import matter from "gray-matter";

export default function Home(props) {
    const {posts} = props;
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
                {posts.map((post, key) => (
                    <ArticlePreview post={post.data} key={key} />
                ))}
            </div>
          </div>
          </div>
        </>
    )
}

export async function getStaticProps() {
    const files = fs.readdirSync("posts");

    const posts = files.map((file) => {
        const slug = file.replace(".md", "");
        const content = fs.readFileSync(`posts/${file}`, "utf-8");
        const parsedContent = matter(content);

        const {data} = parsedContent;
        return {
            slug,
            data
        }
    });

    return {
        props: {
            posts
        }
    }
}
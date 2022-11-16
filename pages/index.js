import ArticlePreview from "../components/article_preview";
import fs from 'fs';
import matter from "gray-matter";
import ReactMarkdown from 'react-markdown';

export default function Home(props) {
    const {posts} = props;
    return (
        <div className="container">
          <div className="mt-20 mx-auto p-5" >
            <p className="text-5xl text-center">Self motivated Backend Engineer in <b className="underline decoration-pink-500">PHP</b> and <b className="underline decoration-pink-500">GO</b>.</p>
              <p className="mt-10 w-2/3 mx-auto text-center">
                  I have worked with veraiety of different companies, and I have had experiences on some really interesting applications.
              </p>
          </div>
          <div className="columns-2 md:columns-2">
            <div className="p-5 w-full pt-12">
                {posts.map((post, index) => (
                    <ArticlePreview post={post} slug={post.slug} key={post.key} />
                ))}
            </div>
          </div>
        </div>
    )
}

export async function getStaticProps() {
    const files = fs.readdirSync("posts");

    const posts = files.map((file, key) => {
        const slug = file.replace(".md", "");
        const content = fs.readFileSync(`posts/${file}`, "utf-8");
        const parsedContent = matter(content);

        const {data} = parsedContent;
        return {
            key,
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
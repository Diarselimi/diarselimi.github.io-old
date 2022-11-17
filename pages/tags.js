import fs from 'fs';
import matter from "gray-matter";
import ReactMarkdown from 'react-markdown';
import ArticlePreview from "../components/article_preview";

export default function Tags({posts}) {

    return (
        <div className="container">
            <h3> Tags </h3>
            <div className="container mx-auto px-4">
            {posts.map((post, key) => (
                    post.data.tags.map((tag, index) => (
                    <button key={key} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        #{tag}
                    </button>
                    ))
            ))}
            </div>
           <div className="w-2/5 xs:w-full">
             <div className="p-5 w-full pt-12">
                 {filterPostsByTag(posts, '').map((post, index) => (
                    <ArticlePreview post={post} slug={post.slug} key={post.key} />
                ))}
            </div>
           </div>
        </div>
    )
}

function filterPostsByTag(posts, tag) {
    return posts.filter(post => post.data.tags.includes(tag));
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
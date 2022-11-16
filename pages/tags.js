import fs from 'fs';
import matter from "gray-matter";
import ReactMarkdown from 'react-markdown';

export default function Tags({posts}) {

    return (
        <div className="container">
            <h3> Tags </h3>
            {posts.map((post) => (
                    post.data.tags.map((tag, index) => (
                        <div key={tag} >
                            <a href={tag} >#{tag}</a>
                        </div>
                    ))
            ))}
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
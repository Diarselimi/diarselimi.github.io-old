import fs from 'fs';
import matter from "gray-matter";

export default function Tags({tags}) {

    return (
        <div className="container">
            <h3> Tags </h3>
            {tags.map((tag, index) => (
                    <div key={tag} >
                        <a href={tag} >#{tag}</a>
                    </div>
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
        console.log(data);
        return {
            key,
            slug,
            data
        }
    });

    const tags = [];
    posts.map((post, key) => {
        tags.concat(post.data.tags);
    });

    return {
        props: {
            tags
        }
    }
}
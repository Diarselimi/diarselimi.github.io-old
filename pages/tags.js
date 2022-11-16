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

    const tags = [];
    for (var i=0; i<files.length; i++) {
        var file = files[i];
        const slug = file.replace(".md", "");
        const content = fs.readFileSync(`posts/${file}`, "utf-8");
        const parsedContent = matter(content);
        console.log(parsedContent);

        tags.concat(parsedContent.tags);
    }

    return {
        props: {
            tags
        }
    }
}
import fs from 'fs';
import matter from "gray-matter";

export default function Tags(props) {
    console.log(props);
    const {tags} = props

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
    tags.concat(files.map((file) => {
        const slug = file.replace(".md", "");
        const content = fs.readFileSync(`posts/${file}`, "utf-8");
        const parsedContent = matter(content);

        console.log(parsedContent);
        return parsedContent.tags;
    }));

    return {
        props: {
            tags
        }
    }
}
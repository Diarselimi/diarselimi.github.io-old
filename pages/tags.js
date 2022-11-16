
export default function Tags(props) {
    const {tags} = props
    return (
        <div className="container">
            {tags.map((tag, index) => (
                    <a href={tag} >#{tag}</a>
                    ))}
        </div>
    )
}

export async function getStaticProps() {
    const files = fs.readdirSync("posts");

    const tags = [];
    const posts = files.map((file, key) => {
        const slug = file.replace(".md", "");
        const content = fs.readFileSync(`posts/${file}`, "utf-8");
        const parsedContent = matter(content);

        tags.concat(parsedContent.tags)
    });

    return {
        props: {
            tags
        }
    }
}
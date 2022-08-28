import fs from "fs";
import matter from "gray-matter";
import hljs from 'highlight.js';
import Navigation from "../../components/navigation";
import 'highlight.js/styles/atom-one-dark.css'
import anchor from "markdown-it-anchor";

export default function Blog({ frontmatter ,content}) {
    const md = require('markdown-it')({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(str, { language: lang }).value;
                } catch (__) {}
            }

            return ''; // use external default escaping
        }
    });
    md.use(anchor, {
        permalink: anchor.permalink.linkInsideHeader({
            placement: 'after',
            space: true,
        })
    });
    return (
        <>
        <Navigation />

        <div className="md:container md:mx-auto">
            <div className="w-100">
                <div className="prose mx-auto">
                    <h1 className="text-4xl">{frontmatter.title}</h1>
                    <hr />
                    <div dangerouslySetInnerHTML={{ __html: md.render(content) }}></div>
                </div>
            </div>
        </div>
        </>
    );
}



export async function getStaticPaths() {
    // Get all the paths from slugs or file names
    const files = fs.readdirSync("posts");
    const paths = files.map((files) => ({
        params: {
            id: files.replace(".md", ""),
        },
    }));

    return {
        paths,
        fallback:false
    }
}

export async function getStaticProps({params:{id}}){
    const fileName = fs.readFileSync(`posts/${id}.md`, "utf-8");
    const { data: frontmatter, content } = matter(fileName);
    return {
        props: {
            frontmatter,
            content,
        },
    };
}
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

    return {
        props: {
            tags : ["go", "php", "learning", "mutex"]
        }
    }
}
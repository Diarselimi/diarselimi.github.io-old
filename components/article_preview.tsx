
function ArticlePreview(props) {
    const {post, slug} = props;
    return (
        <div className="px-5 m-5 pt-10 pb-5 shadow-xl ring-1 ring-gray-300 rounded-lg">
            <div className="mx-auto">
                <div className="tex-base font-semibold">
                    <p className="text-gray-900">{post.data.title}</p>
                </div>
                <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
                    <p>{post.data.description}</p>
                </div>
                <div className="text-base font-semibold leading-7">
                    <p>
                        {post.data.tags.map((tag, i) => (
                            <a className="m-1" key={i} href={"/tag/"+tag}>#{tag}</a>
                        ))}
                    </p>
                    <p>
                        <a href={"/blog/"+slug} className="text-pink-500 hover:text-pink-900">Read more &rarr;</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ArticlePreview
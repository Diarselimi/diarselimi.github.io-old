
function ArticlePreview() {
    return (
        <div className="m-5 px-5 pt-10 pb-8 shadow-xl ring-1 ring-gray-200 sm:max-w-lg sm:rounded-lg">
            <div className="mx-auto max-w-md">
                <div className="tex-base font-semibold">
                    <p className="text-gray-900">Want to dig deeper into Tailwind?</p>
                </div>
                <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
                    <p>What I learned when I moved from PHP to GO</p>
                </div>
                <div className="text-base font-semibold leading-7">
                    <p>
                        <a className="m-1" href="/tag/php">#PHP</a>
                        <a className="m-1" href="/tag/php">#PHP</a>
                        <a className="m-1" href="/tag/php">#PHP</a>
                    </p>
                    <p>
                        <a href="https://tailwindcss.com/docs" className="text-pink-500 hover:text-pink-900">Read more &rarr;</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ArticlePreview
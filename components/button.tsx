
export default function Button(props) {
    const {content, href, isActive} = props;
    return (
        <a href={href} className="inline-flex rounded-sm border-b-2 mr-2 border-pink-500 hover:bg-gray-200 p-2">
            {content}
        </a>
    )
}

export default function Toc(props) {
    const {title} = props
    return (
        <div className="fixed ml-10 w-1/4 max-h-full bg-slate-100 rounded-xl p-2 dark:bg-slate-800">
            <div className="p-5">
                <b>{title}</b>
                <hr />
                <ul>
                    <li>The main content</li>
                    <li>One morning</li>
                </ul>
            </div>
        </div>
    )
}
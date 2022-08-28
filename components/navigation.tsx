import Button from "./button";

export default function Navigation() {
    return (
        <div className="mt-5 mb-5 md:container rounded-sm p-2 pb-0 md:mx-auto">
            <Button content={"← Home"} href="/" />
        </div>
    )
}
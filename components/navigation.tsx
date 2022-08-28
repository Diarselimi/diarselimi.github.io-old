import Button from "./button";

export default function Navigation() {
    return (
        <div className="m-5 md:container md:mx-auto">
            <Button content={"← Home"} href="/" />
        </div>
    )
}
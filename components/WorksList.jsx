import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getWorks = async() => {
    try {
        const res = await fetch('http://localhost:3000/api/works', {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch works");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading works: ", error);
    }
};

export default async function WorksList() {
    const { works } = await getWorks();

    const handleAddFinished = () => {
        const element = document.getElementById('finished')
    }
    
    const handleRemoveFinished = () => {
        const element = document.getElementById('finished')
    }
    
    const handleAddUnFinished = () => {
        const element = document.getElementById('unfinished')
    }
    
    const handleRemoveUnFinished = () => {
        const element = document.getElementById('unfinished')
        element.classList.remove("bg-red-500")
        element.classList.add("bg-green-500")
    }

    return(
        <>
            {works.map((w) => (
                <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
                    <div>
                        <h2 className="font-bold text-2xl">{ w.title }</h2>
                        <div>{ w.description }</div>
                        <div>date</div>
                        <div>
                            <button id="finished" className="bg-green-500 p-2 text-white rounded-md">Finished</button>
                            <button onClick={handleRemoveUnFinished} id="unfinished" className="bg-red-500 p-2 text-white rounded-md">Unfinished</button>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <RemoveBtn id={w._id}/>
                        <Link href={`/editWork/${w._id}`}>
                            <HiPencilAlt size={24} />
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
}
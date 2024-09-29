'use client'
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { useEffect, useState } from "react";

export default function WorksList() {
    const [works, setWorks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            fetch('http://localhost:3000/api/works', {
                method: 'GET',
                cache: "no-store",
            }).then(res => res.json()).then(data => {
                setWorks(data.works);
            }).catch((err) => {
                console.log(err);
            })

            setIsLoading(false);
        } catch (error) {
            console.log("Error loading works: ", error);
            setIsLoading(false);
        }
    }, [])

    const handleAddFinished = () => {
        const element = document.getElementById('finished')
    }

    const handleRemoveFinished = () => {
        const element = document.getElementById('finished')
    }

    const handleAddUnFinished = () => {
        const element = document.getElementById('unfinished')
    }

    const handleRemoveUnFinished = (work) => {
        const work_to_update = works.find(x => x == work);
        work_to_update.status = true;
        const new_works = [...works];
        new_works.splice(works.indexOf(work), 1);
        new_works.push(work_to_update);
        setWorks(new_works);

        
        fetch(`http://localhost:3000/api/works/${work._id}`, {
            method: 'PUT',
            cache: "no-store",
            body: JSON.stringify({
                title: work_to_update.title,
                description: work_to_update.description,
                status: work_to_update.status
            })
        }).then(res => res.json()).then(data => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })

        setIsLoading(false);
    }

    const timeConvert = (time) => {
        const date = new Date(time);
        return date.toLocaleString();
    }

    return (
        <>
            {
                works.length == 0 && !isLoading ? <p>No todos</p> : works.length == 0 ? <><p>Loading...</p></> : works.map((w, index) => (
                    <div key={index} className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
                        <div>
                            <h2 className="font-bold text-2xl">{w.title}</h2>
                            <div>{w.description}</div>
                            <div>{timeConvert(w.duedate)}</div>
                            <div>
                                {
                                    w.status == true ? <button id="finished" className="bg-green-500 p-2 text-white rounded-md">Finished</button> :
                                        <button onClick={()=>{
                                            handleRemoveUnFinished(w);
                                        }} id="unfinished" className="bg-red-500 p-2 text-white rounded-md">Unfinished</button>
                                }
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <RemoveBtn id={w._id} />
                            <Link href={`/editWork/${w._id}`}>
                                <HiPencilAlt size={24} />
                            </Link>
                        </div>
                    </div>
                ))
            }
        </>
    );
}
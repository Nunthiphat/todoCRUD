'use client'; // บอกให้ Next.js รู้ว่านี่คือ Client Component

import { useState } from 'react';

export default function WorksItem({ work }) {
    const [isFinished, setIsFinished] = useState(false);

    const handleRemoveFinished = () => {
        setIsFinished(false);
    }

    const handleAddFinished = () => {
        setIsFinished(true);
    }

    return (
        <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
            <div>
                <h2 className="font-bold text-2xl">{ work.title }</h2>
                <div>{ work.description }</div>
                <div>date</div>
                <div>
                    <button 
                        id="finished" 
                        className={`p-2 text-white rounded-md ${isFinished ? "bg-green-500" : "bg-red-500"}`}
                        onClick={isFinished ? handleRemoveFinished : handleAddFinished}
                    >
                        {isFinished ? 'Finished' : 'Unfinished'}
                    </button>
                </div>
            </div>
        </div>
    );
}

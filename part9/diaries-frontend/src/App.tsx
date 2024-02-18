import { useEffect, useState } from 'react';
import { Diary, NewDiary } from './types/types';
import { createDiary, getAllDiaries } from './services/diaryService';
import DiaryForm from './components/DiaryForm';
import axios from 'axios';
import Notify from './components/Notify';

const App = () => {
    const [diaries, setDiaries] = useState<Diary[]>([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllDiaries();
            setDiaries(response);
        };
        fetchData();
    }, []);

    const addDiary = async (diary: NewDiary) => {
        try {
            const createdDiary = await createDiary(diary);
            setDiaries(diaries.concat(createdDiary));
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data);
                setTimeout(() => {
                    setMessage('');
                }, 5000);
            } else console.log(error);
        }
    };

    return (
        <div>
            <h2>Add new entry</h2>
            <Notify message={message} />
            <DiaryForm addDiary={addDiary} />
            <h2>Diary entries</h2>
            {diaries.map((d) => (
                <div key={d.id}>
                    <h3>{d.date}</h3>
                    <p>visibility: {d.visibility}</p>
                    <p>weather: {d.weather}</p>
                </div>
            ))}
        </div>
    );
};

export default App;


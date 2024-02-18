import { useState } from 'react';
import { NewDiary } from '../types/types';

interface IProps {
    addDiary(diary: NewDiary): Promise<void>;
}

const DiaryForm = (props: IProps) => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');

    const diaryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const diaryToAdd = {
            date,
            visibility,
            weather,
            comment,
        };
        props.addDiary(diaryToAdd);
    };

    return (
        <form onSubmit={diaryCreation}>
            <div>
                date: <input type="date" value={date} onChange={({ target }) => setDate(target.value)} />
            </div>
            <div>
                visibility: great
                <input
                    name="great"
                    checked={visibility === 'great'}
                    type="radio"
                    value="great"
                    onChange={({ target }) => setVisibility(target.value)}
                />{' '}
                good
                <input
                    name="good"
                    checked={visibility === 'good'}
                    type="radio"
                    value="good"
                    onChange={({ target }) => setVisibility(target.value)}
                />{' '}
                ok
                <input
                    name="ok"
                    checked={visibility === 'ok'}
                    type="radio"
                    value="ok"
                    onChange={({ target }) => setVisibility(target.value)}
                />{' '}
                poor
                <input
                    name="poor"
                    checked={visibility === 'poor'}
                    type="radio"
                    value="poor"
                    onChange={({ target }) => setVisibility(target.value)}
                />
            </div>
            <div>
                weather: sunny
                <input
                    name="sunny"
                    checked={weather === 'sunny'}
                    type="radio"
                    value="sunny"
                    onChange={({ target }) => setWeather(target.value)}
                />{' '}
                rainy
                <input
                    name="rainy"
                    checked={weather === 'rainy'}
                    type="radio"
                    value="rainy"
                    onChange={({ target }) => setWeather(target.value)}
                />{' '}
                cloudy
                <input
                    name="cloudy"
                    checked={weather === 'cloudy'}
                    type="radio"
                    value="cloudy"
                    onChange={({ target }) => setWeather(target.value)}
                />{' '}
                stormy
                <input
                    name="stormy"
                    checked={weather === 'stormy'}
                    type="radio"
                    value="stormy"
                    onChange={({ target }) => setWeather(target.value)}
                />{' '}
                windy
                <input
                    name="windy"
                    checked={weather === 'windy'}
                    type="radio"
                    value="windy"
                    onChange={({ target }) => setWeather(target.value)}
                />
            </div>
            <div>
                comment: <input value={comment} onChange={({ target }) => setComment(target.value)} />
            </div>
            <button type="submit">add</button>
        </form>
    );
};

export default DiaryForm;

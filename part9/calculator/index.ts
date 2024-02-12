import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Fullstack');
});

app.get('/bmi', (req, res) => {
    try {
        const { height, weight } = req.query;

        if (isNaN(Number(weight)) || isNaN(Number(height))) throw new Error('malformatted parameters');

        const bmi: string | undefined = calculateBmi(Number(height), Number(weight));
        if (!bmi) throw new Error('Something went wrong');
        res.json({ weight, height, bmi });
    } catch (error) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(400).json({ error: errorMessage });
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    try {
        if (!daily_exercises || !target) throw new Error('missing parameters');
        if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) throw new Error('malformatted parameters');
        if (daily_exercises instanceof Array) {
            daily_exercises.forEach((e) => {
                if (typeof e === 'number') return true;
                else throw new Error('malformatted parameters');
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const result = calculateExercise(daily_exercises, Number(target));
        res.json(result);
    } catch (error) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(400).json({ error: errorMessage });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

interface Values {
    value1: number;
    value2: number;
}

const parseArguments = (args: string[]): Values => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3]),
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateBmi = (height: number, weight: number): string | undefined => {
    if (height <= 0 || weight <= 0) throw new Error('Incorrect parameters');

    const bmi = weight / (height / 100) ** 2;

    if (bmi < 16) return 'Underweight (severe thinness)';
    else if (bmi < 17) return 'Underweight (moderate thinness)';
    else if (bmi < 18.5) return 'Underweight (mild thinness)';
    else if (bmi < 25) return 'Normal (healthy weight)';
    else if (bmi < 30) return 'Overweight (pre-obese)';
    else if (bmi < 35) return 'Obese (class 1)';
    else if (bmi < 40) return 'Obese (class 2)';
    else if (bmi >= 40) return 'Obese (class 3)';
    return;
};

try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

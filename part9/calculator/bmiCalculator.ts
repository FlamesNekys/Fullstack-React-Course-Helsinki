const calculateBmi = (height: number, weight: number): string => {
    if (height <= 0 || weight <= 0) throw new Error('Incorrect parameters')

    const bmi = weight / (height / 100) ** 2

    if (bmi < 16) return 'Underweight (severe thinness)'
    else if (bmi < 17) return 'Underweight (moderate thinness)'
    else if (bmi < 18.5) return 'Underweight (mild thinness)'
    else if (bmi < 25) return 'Normal (healthy weight)'
    else if (bmi < 30) return 'Overweight (pre-obese)'
    else if (bmi < 35) return 'Obese (class 1)'
    else if (bmi < 40) return 'Obese (class 2)'
    else if (bmi >= 40) return 'Obese (class 3)'
}

console.log(calculateBmi(180, 74))

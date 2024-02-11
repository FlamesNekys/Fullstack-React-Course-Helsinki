interface IResult {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

const calculateExercise = (dayHours: number[], target: number): IResult => {
    const periodLength = dayHours.length
    const trainingDays = dayHours.filter((h) => h !== 0).length
    const average = dayHours.reduce((acc, el) => (acc += el), 0) / periodLength
    const success = average >= target
    const rating = target / average > 2 ? 1 : target / average > 1 ? 2 : 3
    const ratingDescription =
        rating === 1
            ? 'Very bad, you need to make more effort'
            : rating === 2
            ? 'Not too bad but could be better'
            : 'Very good job, keep going!'

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    }
}

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2))

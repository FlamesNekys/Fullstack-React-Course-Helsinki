interface IResult {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

interface Params {
    target: number
    dayHours: number[]
}

const parseParameters = (args: string[]): Params => {
    if (args.length < 4) throw new Error('Not enough arguments')
    args = args.slice(2)

    const dayHours: number[] = []
    let target: number

    args.forEach((v, id) => {
        if (!isNaN(Number(v))) {
            id === 0 ? (target = +v) : dayHours.push(+v)
        } else throw new Error('Provided values were not numbers!')
    })

    return { target, dayHours }
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
try {
    const { target, dayHours } = parseParameters(process.argv)
    console.log(calculateExercise(dayHours, target))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message
    }
    console.log(errorMessage)
}

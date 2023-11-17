// interface Values_2 {
//     value1_: number;
//     value2_: number[];
//   }
  
//   const parse = (args: string[]): Values_2 => {
//     if (args.length < 4) throw new Error('Not enough arguments');
//     if (args.length > 4) throw new Error('Too many arguments');
  
//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//       return {
//         value1: Number(args[2]),
//         value2: Number(args[3])
//       }
//     } else {
//       throw new Error('Provided values were not numbers!');
//     }
//   }


// interface Result {
//     periodLength: number;
//     trainingDays: number;
//     success: boolean;
//     rating: number;
//     ratingDescription: string;
//     target: number;
//     average: number;
//   }
  
//   const calculateExercises = (hours: number[], target: number): Result => {
//     const periodLength = hours.length;
//     const trainingDays = hours.filter((hour) => hour > 0).length;
//     const totalHours = hours.reduce((a, b) => a + b, 0);
//     const average = totalHours / periodLength;
  
//     const success = average >= target;
//     let rating = 0;
//     let ratingDescription = '';
  
//     if (average < target / 2) {
//       rating = 1;
//       ratingDescription = 'bad';
//     } else if (average >= target / 2 && average < target) {
//       rating = 2;
//       ratingDescription = 'not too bad but could be better';
//     } else if (average >= target) {
//       rating = 3;
//       ratingDescription = 'excellent';
//     }
  
//     return {
//       periodLength,
//       trainingDays,
//       success,
//       rating,
//       ratingDescription,
//       target,
//       average,
//     };
//   };
  
//   const result = calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);
//   console.log(result);
  
// interface ExerciseArguments {
//     target: number;
//     dailyExercises: number[];
//   }
  
  const parse = (args: string[]) => {
    if (args.length < 4) throw new Error('Not enough arguments');
    
    const target = Number(args[2]);
    if (isNaN(target)) throw new Error('Target value is not a number');
  
    const dailyExercises = args.slice(3).map((arg) => {
        const hours = Number(arg);
        if (isNaN(hours)) {
          throw new Error('Provided exercise hours are not valid numbers!');
        }
        return hours;
      });
  
    return {
      target,
      dailyExercises,
    };
  };
  
  export const calculateExercises = (target: number, dailyExercises: number[]) => {
    const periodLength = dailyExercises.length;
    const trainingDays = dailyExercises.filter((hours) => hours > 0).length;
    const totalHours = dailyExercises.reduce((acc, hours) => acc + hours, 0);
    const average = totalHours / periodLength;

    const success = average >= target;
        let rating = 0;
        let ratingDescription = '';
      
        if (average < target / 2) {
          rating = 1;
          ratingDescription = 'bad';
        } else if (average >= target / 2 && average < target) {
          rating = 2;
          ratingDescription = 'not too bad but could be better';
        } else if (average >= target) {
          rating = 3;
          ratingDescription = 'excellent';
        }
  
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average,
    };
  };
  
  try {
    const { target, dailyExercises } = parse(process.argv);
    const result = calculateExercises(target, dailyExercises);
    console.log(result);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
  
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
        value2: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };


export const calculateBmi = (h:number, w:number) =>{
    // const a: number = Number(process.argv[2])
  if ( h <=0){
    return("Height can't be less or equal 0");
  }
 const index:number =  w/((h/100)**2);
 if (index < 16){
    return ("Underweight (severe thinness)");
 } else if ( index >=16 && index < 17){
    return ("Underweight (moderate thinness)");
 } else if ( index >=17 && index < 18.5){
    return ("Underweight (mild thinness)");
 } else if ( index >=18.5 && index < 25){
    return ("Normal (healthy weight)");
 }  else if ( index >=25 && index < 30){
    return ("Overweight");
 } else if ( index >=30 && index < 35){
    return ("Obesity (obese class 1)");
 } else if ( index >=35 && index < 40){
    return ("Obesity (obese class 2)");
 }else if ( index >=40){
    return ("Obesity (obese class 3)");
 }
 return "Unknown";
};

// console.log(calculateBmi(0, 74))

try {
    const { value1, value2 } = parseArguments(process.argv);
    const result = calculateBmi(value1, value2);
    console.log(result);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }

  
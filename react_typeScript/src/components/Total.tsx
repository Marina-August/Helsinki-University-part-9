
interface TotalProps{
    totalExercises: number
}

const Total =(props:TotalProps)=>{
    return (
        <div>
          <h3>
           Number of exercises {props.totalExercises}
          </h3>
        </div>
    )
}

export default Total;
interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }
  
  interface CoursePartBasic extends CoursePartDescription {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartSpecial extends CoursePartDescription{
    requirements: string [];
    kind: "special"
  }
  
  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface PartProps{
    el: CoursePart
}

const Part = (props: PartProps) =>{
    return (
        <div>
        {props.el.kind ==='basic' &&  
            <div>
               <h2>{props.el.name} {props.el.exerciseCount}</h2>
               <p>{props.el.description}</p>
            </div>}
        {props.el.kind ==='group' &&  
            <div>
               <h2>{props.el.name} {props.el.exerciseCount}</h2>
               <p> project exercises {props.el.groupProjectCount}</p>
           </div>} 
        {props.el.kind ==='background' &&  
            <div>
               <h2>{props.el.name} {props.el.exerciseCount}</h2>
               <p>{props.el.description}</p>
               <p> submit to {props.el.backgroundMaterial}</p>
           </div>}       
        {props.el.kind ==='special' &&  
            <div>
               <h2>{props.el.name} {props.el.exerciseCount}</h2>
               <p>{props.el.description}</p>
               <div> required skills: {props.el.requirements.map(e=>(
                  <span key={e}>{e} </span>
               ))}</div>
           </div>}  

        </div>
    )
}

export default Part;
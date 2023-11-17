import Part from "./Part"

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

interface ContentProps{
    courseParts: CoursePart[]
}

const Content =(props: ContentProps)=>{
    return (
        <div>
            {props.courseParts.map((el)=>(
                <Part key={el.name} el={el}/>
            ))}
        </div>
    )
}

export default Content;
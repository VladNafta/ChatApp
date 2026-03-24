import classes from "./Detail.module.css"

const Detail = ({classesName = ""}) => {
  return (
    <div className={`${classes.detail} ${classesName}`}>Detail</div>
  )
}

export default Detail
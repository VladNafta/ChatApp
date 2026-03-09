import classes from "./SocialMedia.module.css"

export default function SocialMedia({ img, alt }) {
  return (
    <button className={classes["social-media"]}>
      <img src={img} alt={alt} />
    </button>
  );
}

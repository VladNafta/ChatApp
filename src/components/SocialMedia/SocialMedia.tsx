import classes from "./SocialMedia.module.css";

interface ErrorProps {
  alt: string;
  src: string;
}

const SocialMedia = ({ src, alt }: ErrorProps) => {
  return (
    <button className={classes["social-media"]}>
      <img src={src} alt={alt} />
    </button>
  );
};

export default SocialMedia;

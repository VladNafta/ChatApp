import classes from "./SocialMedia.module.css";

interface SocialMediaProps {
  alt: string;
  src: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "reset" | "button";
}

const SocialMedia = ({ src, alt, onClick, type }: SocialMediaProps) => {
  return (
    <button type={type} onClick={onClick} className={classes["social-media"]}>
      <img src={src} alt={alt} />
    </button>
  );
};

export default SocialMedia;

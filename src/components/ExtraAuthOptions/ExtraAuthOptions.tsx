import SocialMedia from "../SocialMedia/SocialMedia";
import classes from "./ExtraAuthOptions.module.css";

import googleIcon from "../../assets/google-icon.svg"

interface ExtraAuthOptionsProps {}

const ExtraAuthOptions = ({}: ExtraAuthOptionsProps) => {
  return (
    <div className={classes["social-medias"]}>
      <SocialMedia src={googleIcon} alt="google" />
      {/* <SocialMedia img={githubIcon} alt="github" />
      <SocialMedia img={discordIcon} alt="discord" /> */}
    </div>
  );
};

export default ExtraAuthOptions;

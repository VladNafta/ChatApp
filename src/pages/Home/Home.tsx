// import { useEffect } from "react";
// import { useNavigate } from "react-router";
// import classes from "./Home.module.css";
import ChatItem from "../../components/ChatItem/ChatItem";
import defaultAvatar from "../../assets/default-avatar2.jpg";
import Message from "../../components/UI/MessageItem/MessageItem";

export default function HomePage() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   navigate("/log-in");
  // }, [navigate]);

  return (
    <>
      <ChatItem
        src={defaultAvatar}
        name="Christopher Campbell"
        text="In front of the Bar, about which you can see a lot of people"
      ></ChatItem>

      <Message text="I was asking for your New Year Plans, ask we are going to host a party." />
      <></>
    </>
  );
}

{
  /* <div className={classes["chat-items"]}>
  <ChatItem
    img={defaultAvatar}
    name="Christopher Campbell"
    text="In front of the Bar, about which you can see a lot of people"
  ></ChatItem>
  <ChatItem
    img={defaultAvatar}
    name="Christopher Campbell"
    text="In front of the Bar, about which you can see a lot of people"
  ></ChatItem>
  <ChatItem
    img={defaultAvatar}
    name="Christopher Campbell"
    text="In front of the Bar, about which you can see a lot of people"
  ></ChatItem>
  <ChatItem
    img={defaultAvatar}
    name="Christopher Campbell"
    text="In front of the Bar, about which you can see a lot of people"
  ></ChatItem>
  <ChatItem
    img={defaultAvatar}
    name="Christopher Campbell"
    text="In front of the Bar, about which you can see a lot of people"
  ></ChatItem>
  <ChatItem
    img={defaultAvatar}
    name="Christopher Campbell"
    text="In front of the Bar, about which you can see a lot of people"
  ></ChatItem>
  <ChatItem
    img={defaultAvatar}
    name="Christopher Campbell"
    text="In front of the Bar, about which you can see a lot of people"
  ></ChatItem>
  <ChatItem
    img={defaultAvatar}
    name="Christopher Campbell"
    text="In front of the Bar, about which you can see a lot of people"
  ></ChatItem>
  <ChatItem
    img={defaultAvatar}
    name="Christopher Campbell"
    text="In front of the Bar, about which you can see a lot of people"
  ></ChatItem>
  <ChatItem
    img={defaultAvatar}
    name="Christopher Campbell"
    text="In front of the Bar, about which you can see a lot of people"
  ></ChatItem>
</div> */
}
